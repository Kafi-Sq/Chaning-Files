const fs = require('fs');
const dir = './data/left';

const fileNames = fs.readdirSync("./data/left")

fs.readdir(dir, (err, files) => {
    console.log(files.length);
    let names = [], i = 0;
    while(names.length < files.length){
        var r = Math.floor(Math.random() * files.length) + 1;
        if(names.indexOf(r) === -1) names.push(r);
    }
    console.log(names)


    for(let fls of fileNames){
      //console.log(fls)
      let oldName = `./data/left/${fls}`
      let newName = `./data/left/${names[i]}.gif`
      fs.rename(oldName, newName, err => {
          if (err) {
            throw err
          }
        
          console.log('Directory renamed successfully.')
        })
      i++
    }

});






