const express = require("express");
const { static } = require("express");
const app = express();
const { json } = require("body-parser");
const compiler = require("compilex");
const options = { stats: true };
compiler.init(options);

app.use(function(req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    next();
});

app.use(json());
app.use("/codemirror-5.65.16", static("C:/Users/tiago/OneDrive/Documentos/Compilador/codemirror-5.65.16"));
app.use(static("C:/Users/tiago/OneDrive/Documentos/Compilador")); // Add this line to serve the styles.css file

app.get("/", function(req, res) {
    res.sendFile("C:/Users/tiago/OneDrive/Documentos/Compilador/editor.html");
});

app.post("/compile", async function(req, res) {
    const { code, lang, testCases } = req.body;
    const results = [];

    for (const testCase of testCases) {
        const { input, expected } = testCase;
        const envData = { OS: "windows" };

        try {
            let result;
            if (lang === "Cpp") {
                if (!input) {
                    result = await new Promise((resolve, reject) => {
                        compiler.compileCPP(envData, code, function(data) {
                            if (data.error) reject(data.error);
                            resolve(data.output);
                        });
                    });
                } else {
                    result = await new Promise((resolve, reject) => {
                        compiler.compileCPPWithInput(envData, code, input, function(data) {
                            if (data.error) reject(data.error);
                            resolve(data.output);
                        });
                    });
                }
            } else if (lang === "Java") {
                if (!input) {
                    result = await new Promise((resolve, reject) => {
                        compiler.compileJava(envData, code, function(data) {
                            if (data.error) reject(data.error);
                            resolve(data.output);
                        });
                    });
                } else {
                    result = await new Promise((resolve, reject) => {
                        compiler.compileJavaWithInput(envData, code, input, function(data) {
                            if (data.error) reject(data.error);
                            resolve(data.output);
                        });
                    });
                }
            } else if (lang === "Python") {
                if (!input) {
                    result = await new Promise((resolve, reject) => {
                        compiler.compilePython(envData, code, function(data) {
                            if (data.error) reject(data.error);
                            resolve(data.output);
                        });
                    });
                } else {
                    result = await new Promise((resolve, reject) => {
                        compiler.compilePythonWithInput(envData, code, input, function(data) {
                            if (data.error) reject(data.error);
                            resolve(data.output);
                        });
                    });
                }
            }
            results.push({ input, expected, output: result.trim(), passed: result.trim() === expected.trim() });
        } catch (error) {
            console.log(error);
            results.push({ input, expected, output: error, passed: false });
        }
    }

    res.send(results);
});

app.listen(5500, function() {
    console.log("Server is running on port 5500");
});
