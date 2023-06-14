const mongooes = require('mongoose');

mongooes.set('strictQuery', false);

mongooes.connect("mongodb+srv://dobob777:jwtToken123@jwt-demo.ucwzqui.mongodb.net/jwtDB", {
    useNewUrlParser: true,
}).then(() => {
    console.log('DB Connection....done');
}).catch((error) => {
    console.log(error);
})