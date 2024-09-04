const certificateTemplate = {
    individual: './templates/individual.html',
    team:       './templates/team.html'
}
const port = process.env.PORT || 3000;
const baseUrl = `http://localhost:${port}`;

const downloadCertificatePath = `${baseUrl}/downloadCertificate`;
const getCertificatePath = (fileName) => `${baseUrl}/output/${fileName}`;
const getOutputFilePath = (fileName) => `./output/${fileName}`;

const getAsset = `${baseUrl}/assets`;

module.exports = { certificateTemplate, downloadCertificatePath, getCertificatePath, getOutputFilePath, getAsset }