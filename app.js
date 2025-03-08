const { createApp } = Vue;

createApp({
    data() {
        return {
            populationData: [],
            sortKey: 'year',
            sortOrder: 'asc'
        };
    },
    computed: {
        sortedData() {
            return [...this.populationData].sort((a, b) => {
                let keyA = a[this.sortKey], keyB = b[this.sortKey];
                return (this.sortOrder === 'asc' ? keyA - keyB : keyB - keyA);
            });
        }
    },
    methods: {
        fetchData() {
            fetch("https://datausa.io/api/data?drilldowns=Nation&measures=Population")
                .then(response => response.json())
                .then(data => {
                    this.populationData = data.data.map(entry => ({
                        Year: entry.Year,
                        Population: entry.Population
                    }));
                })
                .catch(error => console.error("Error fetching data:", error));
        },
        sortData(key) {
            if (this.sortKey === key) {
                this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
            } else {
                this.sortKey = key;
                this.sortOrder = 'asc';
            }
        }
    },
    mounted() {
        this.fetchData();
    }
}).mount("#app");
