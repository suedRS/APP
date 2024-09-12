const { select, input} = require('@inquirer/prompts')

let meta = {
    value: 'tomar 3l de agua por dia',
    checked: false,
}

let metas = [ meta ]

const cadastrarMeta = async () => {
    const meta = await input({message: "digite a meta:"})

    if(meta.length == 0){
        console.log('a meta nao pode ser vazia')
        return
    }

    metas.push(
        { value: meta, checked: false }
    )
}

const start = async () => {
    
    while(true){
         
        const opcao = await select({
            message: "Menu >",
            choices: [
                {
                    name: "cadastra meta",
                    value: "cadastrar"
                },
                {
                    name:"listar metas",
                    value:"listar"
                },
                {
                    name:"sair",
                    value:"sair"
                }
            ]
        })

        switch(opcao){
            case "cadastrar":
                await cadastrarMeta()
                console.log(metas)
                break
            case "listar":
                console.log("vamos listar")
                break
            case "sair":
                return
        }
    }
    
    
    
}

start()