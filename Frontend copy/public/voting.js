const getVotes = async () => {
    let votes = await axios.get('http://localhost:9090');
    console.log(votes.data);
    votes = votes.data;
    const ctx = document.querySelector('#myChart').getContext('2d');
    const config = {
        type: 'bar',
        data: {
            labels: ['Inban', 'Kushaal', 'Chiddy'],
            datasets: [{
                label: 'Votes',
                data: [parseInt(votes.Inban), parseInt(votes.Kushaal), parseInt(votes.Chiddy)],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(0, 255, 0, 0.2)',
                    'rgba(0, 0, 255, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(0, 255, 0, 1)',
                    'rgba(0, 0, 255, 1)'
                ],
                borderWidth: 1

            }]
        },
        options: {
            indexAxis: 'y',
            legend: {
                display: false,
                labels: {
                    display: false
                }
            },
            scales: {
                x: {
                    grid: {
                        drawOnChartArea: false,
                        beginAtZero: true
                    }
                },
                y: {
                    beginAtZero: true
                }
            },
        },
    };
    new Chart(ctx,config );
}