const { createApp } = Vue;

createApp({
    data() {
        return {
            populationData: []
        };
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
        }
    },
    mounted() {
        this.fetchData();
    }
}).mount("#app");
