import express from "express";
import cors from "cors";
import dialogflow from "@google-cloud/dialogflow";

const sessionClient = new dialogflow.SessionsClient();

const app = express();
app.use(cors());
const PORT = process.env.PORT || 7000;

app.post("/chatbot", async (req, res) => {
    const projectId = "app-first-rwie"
    const sessionId = "session123"
    const query = req.body.text
    const languageCode = "en-US"

    const sessionPath = sessionClient.projectAgentSessionPath(
        projectId,
        sessionId
    );
    // The text query request.
    const request = {
        session: sessionPath,
        queryInput: {
            text: {
                text: query,
                languageCode: languageCode,
            },
        },
    };
    const responses = await sessionClient.detectIntent(request);
    return responses[0];
})
res.send({
    text: "Hello, I am Server response",
});
app.get("/chatbot", (req, res) => {
    res.send("Chatbot response");
});
app.get("/about", (req, res) => {
    res.send("some information about me");
});
app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
});
