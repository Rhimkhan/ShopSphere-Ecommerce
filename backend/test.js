const dns = require("dns");
dns.setServers(["8.8.8.8"]);

const mongoose = require("mongoose");

mongoose.connect(
    "mongodb+srv://shopsphereadmin:bKkSfgcPVlnI4AtY@shopsphere-cluster.afhklwa.mongodb.net/shopsphere?retryWrites=true&w=majority&appName=shopsphere-cluster"
)
    .then(() => {
        console.log("CONNECTED");
        process.exit(0);
    })
    .catch(err => {
        console.error(err);
        process.exit(1);
    });