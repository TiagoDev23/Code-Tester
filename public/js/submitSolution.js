document.getElementById('submitSolutionForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const userId = document.getElementById('userId').value;
    const challengeId = document.getElementById('challengeId').value;
    const code = document.getElementById('code').value;
    const language = document.getElementById('language').value;
    const testCases = JSON.parse(document.getElementById('testCases').value);

    try {
        const response = await fetch('http://localhost:3000/api/submissions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userId,
                challengeId,
                code,
                language,
                testCases,
            }),
        });

        const data = await response.json();
        if (response.ok) {
            alert('Solução submetida com sucesso!');
        } else {
            alert('Erro ao submeter solução: ' + data.message);
        }
    } catch (error) {
        alert('Erro ao submeter solução: ' + error.message);
    }
});
