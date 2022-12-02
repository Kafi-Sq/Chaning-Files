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


    let oldName = ''
    for(let file of fileNames){
        oldName = file.toString()
        let newName = names[i].toString()

        console.log(oldName)
        console.log(newName)
        
        fs.rename(oldName, newName, renameCallback)

        function renameCallback(err){
            if(err){
                console.log(err.message)
            }else {
                console.log(`Renamed ${oldName} to ${newName}`)
            }
        }

        i++
    }

    //console.log(names)
});





