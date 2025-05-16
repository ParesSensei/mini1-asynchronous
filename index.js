const fs = require("fs");
const superagent = require("superagent");

const readFilePro = file => {
    return new Promise((resolve, reject) => {
        fs.readFile(file, "utf-8", (err, data) => {
            if (err) reject("I could not find that file");
            resolve(data.trim());
        });
    });
};


const writeFilePro = (file, data) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(file, data, err => {
            if (err) reject("I could not write that file");
            resolve(data);
        });
    });
};

const getDogPic = async () => {
    try{
        const data = await readFilePro(`${__dirname}/dog.txt`);
        console.log(`Breed: ${data}`);
        
        const res1Pro = superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);    
        const res2Pro = superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
        const res3Pro = superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
        
        const all = await Promise.all([res1Pro, res2Pro, res3Pro]);
        const imgs = all.map(el => el.body.message);
        console.log(imgs);

        await writeFilePro("dog-img.txt", imgs.join('\n'));
        console.log("Random dog image saved to file");
    } catch (err) {
        console.log(err);
        throw ("error")
    } 
    return '2: Ready'
};


(async () => {
    try{
        console.log("1: will get dog pic");
        const x = await getDogPic();
        console.log(x);
        console.log("3: done getting dog pic");
    } catch(err) {
        console.log("error");
    }
}) ();


// console.log("1: will get dog pic");
// getDogPic()
// .then( x => {
//     console.log(x);
//     console.log("3: done getting dog pic");
// }).catch(err => {
//     console.log("error")
// })


// readFilePro(`${__dirname}/dog.txt`)
//     .then(data => {
//         console.log(`Breed: ${data}`);
//         return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
//     })
//     .then(res => {
//         console.log(res.body.message);
//         return writeFilePro("dog-img.txt", res.body.message)
//     })
//     .then(() => {
//         console.log("Random dog image saved to file");
//     })
//     .catch(err => {
//         console.log(err.message); 
//     });

