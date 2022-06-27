const nargs = /\{([0-9a-z]+)\}/gi;
const create = {
    TOC(string = "") {
        const sections = ["Installation", "Usage", "Built With", "Support"];
        for (var section of sections) {
            string += `* [${section}](#${section.toLowerCase().replace(/(\s)/g, "-")})\n`;
        }
        return string.trim();
    },
    tech(technologies) {
        return technologies.map((tech) => `* ${tech}`).join("\n");
    },
    convertTemplate(template, data) {
        const variables = {
            name: data.name,
            description: data.description,
            username: data.username,
            repo: data.repo,
            license: data.license,
            toc: create.TOC(),
            usage: data.usage,
            tech: create.tech(data.tech),
        };
        return stringTemplate(template, variables);
    },
};

function stringTemplate(string, object) {
    if (!object) return string;
    return string.replace(nargs, function replaceArg(match, word, index) {
        word = word.toLowerCase();
        if (string[index - 1] === '{' && string[index + match.length] === '}') {
            return word;
        } else {
            const result = word in object ? object[word] : null;
            if (result === null || result === undefined) {
                return '';
            }
            return String(result);
        }
    });
}

module.exports = create.convertTemplate;