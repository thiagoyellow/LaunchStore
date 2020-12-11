async function post(req, res, next) {
     // Logica de salvar
     const keys = Object.keys(req.body)

     for (key of keys) {
         // req.body.key == ""
         if (req.body[key] == "") {
             return res.send('Por favor, preencha todos os campos!')
         }
     }

     
     if(!req.files || req.files.length == 0)
         return res.send('Por favor, envie ao menos uma imagem')

    next()

}

async function put(req, res, next) {
    const keys = Object.keys(req.body)

            for (key of keys) {
                // req.body.key == ""
                if (req.body[key] == "" && key != "removed_files") {
                    return res.send('Por favor, preencha todos os campos!')
                }
            }

 next()

}

module.exports = {
    post,
    put
}