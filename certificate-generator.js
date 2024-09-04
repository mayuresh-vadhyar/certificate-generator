const puppeteer = require('puppeteer');
const Joi = require('joi');
const fs = require('fs');
const uuid = require("uuid");
const constants = require('./constants');

// defining the structure of Download Certificate API request body
const downloadRequest = Joi.object({
    certificateType: Joi.string().valid('individual', 'team').required(),
    competitionName: Joi.string().min(3).max(50).required(),
    eventDate: Joi.date().iso().required(),
    eventName: Joi.string().min(3).max(30).required(),
    name: Joi.string().min(3).max(30).required(),
    organizationName: Joi.string().min(3).max(16).required(),
    title: Joi.string().valid('Mr.', 'Ms.', 'Mrs.').required()
});

function replaceKeywordsInTemplate(templateContent, body) {
    return templateContent
        .replace(/{{getAsset}}/g, constants.getAsset)
        .replace(/{{organizationName}}/g, body.organizationName)
        .replace(/{{title}}/g, body.title)
        .replace(/{{name}}/g, body.name)
        .replace(/{{competitionName}}/g, body.competitionName)
        .replace(/{{eventDate}}/g, new Date(body.eventDate).toLocaleDateString('en-US', {year:'numeric',month:'long',day:'numeric'}))
        .replace(/{{eventName}}/g, body.eventName)
        .replace(/{{eventName}}/g, body.eventName);
}

function saveCertificate(fileName, buffer, cb) {
    const filePath = constants.getOutputFilePath(fileName);
    fs.writeFile(filePath, buffer, (err) => {
        if (err) {
            return cb(err);
        }
        const url = constants.getCertificatePath(fileName);
        cb(null, url);
    });
    
}

function downloadCertificate(req, res) {
    validation = downloadRequest.validate(req.body);
    if (validation.error) {
        return res.status(400).send(`Validation error: ${validation.error.details[0].message}`);
    }

    const templatePath = constants.certificateTemplate[req.body.certificateType];

    fs.readFile(templatePath, 'utf8', (readErr, templateContent) => {
        if (readErr) {
            return res.send(readErr);
        }

        const renderedHTML = replaceKeywordsInTemplate(templateContent, req.body);
        puppeteer.launch({ headless: true, args: ["--no-sandbox", "--disable-setuid-sandbox", '--window-size=860,600', '--start-maximized'] }).then(browser => {
            return browser.newPage().then(page => {
                return page.setContent(renderedHTML).then(() => {
                    const pdfOptions = {
                        landscape: true,
                        format: 'A5',
                    };
                    return page.pdf(pdfOptions).then(buffer => {
                        return browser.close().then(() => {
                            return buffer;
                        }).catch(err => console.error(err));
                    });
                });
            }).catch(error => {
                console.error('Error creating new page or setting content:', error);
            });
        }).then(buffer => {
            const fileName = `${req.body.certificateType}-${uuid.v4()}.pdf`;
            saveCertificate(fileName, buffer, function(err, url) {
                if (err) {
                    console.error(err);
                    res.send(err);
                } else {
                    res.json({url});
                }
            });
        }).catch(err => {
            console.error(err);
            res.send(err);
        });
    })
}

module.exports = { downloadCertificate };
