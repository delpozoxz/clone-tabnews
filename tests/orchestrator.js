import retry from "async-retry";

async function waitForAllServices() {
    await wairForWebServer();

    async function wairForWebServer() {
        return  retry(fetchStatusPage, {retries: 100, maxTimeout: 1000});

        async function fetchStatusPage() {
            const response = await fetch("http://localhost:3000/api/v1/status");
            if(response.status !== 200) {
                throw new Error(`Service is not ready. Status code: ${response.status}`);
            }
        }
    }
}

export default { waitForAllServices };