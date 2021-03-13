const fs = require("fs");
const path = require("path")

const DIRECTORY_PATH = "./content"

module.exports = {
    getPostsData: function () {
        const filenames = fs.readdirSync(DIRECTORY_PATH)

        return filenames.map((filename) => {
            const directoryPath = path.join(__dirname, "../content/" + filename)
            const fileContents = fs.readFileSync(directoryPath, "utf8")
            
            return {filename, fileContents}
        })
    }
}