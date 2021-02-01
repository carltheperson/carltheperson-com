const matter = require('gray-matter')
const path = require('path');

module.exports = {
    getPostsList: function () {
        const fs = require('fs');
        const directoryPath = "./content"

        fileNames = fs.readdirSync(directoryPath)

        return fileNames.map((file) => {
            const urlName = file.split(".")[0]

            const directoryPath = path.join(__dirname, "../content/" + file)
            data = fs.readFileSync(directoryPath, "utf8")
            
            const metaData = matter(data)

            return {title: metaData.data.title, date: metaData.data.date, fileName: file, urlName: urlName}
        })
    }
}