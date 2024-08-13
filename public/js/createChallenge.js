document.getElementById('createChallengeForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const inputDescription = document.getElementById('inputDescription').value;
    const outputDescription = document.getElementById('outputDescription').value;
    const testCases = JSON.parse(document.getElementById('testCases').value);

    try {
        const response = await fetch('http://localhost:3000/api/challenges', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title,
                description,
                inputDescription,
                outputDescription,
                testCases,
            }),
        });

        const data = await response.json();
        if (response.ok) {
            alert('Desafio criado com sucesso!');
        } else {
            alert('Erro ao criar desafio: ' + data.message);
        }
    } catch (error) {
        alert('Erro ao criar desafio: ' + error.message);
    }
});
