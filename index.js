const { select, input, checkbox} = require('@inquirer/prompts')
const fs = require("fs").promises

let mensagem = "Bem vindo ao app de metas";

let meta = {
    value: 'tomar 3l de agua por dia',
    checked: false,
}

let metas = [ meta ]

const carregarMetas = async () => {
    try{
        const dados = await fs.readFile("metas.json", "utf-8")
        metas = JSON.parse(dados)
    }
    catch(error){
        metas = []
    }
}

const salvarMetas = async () => {
    await fs.writeFile("metas.json", JSON.stringify(metas, null, 2))
}

const cadastrarMeta = async () => {
    const meta = await input({message: "digite a meta:"})

    if(meta.length == 0){
        mensagem = 'a meta nao pode ser vazia'
        return
    }

    metas.push(
        { value: meta, checked: false }
    )

    mensagem = "meta cadastrada com sucesso"
}

const listarMetas = async () => {
    if(metas.length == 0){
        mensagem = "nao existem metas!"
        return
    }
    const respostas = await checkbox({
        message: "use as setas para mudar de meta, o espaço para marcar ou desmarcar e o Enter para finalizar essa etapa",
        choices: [...metas],
        instructions:false,
    })

    metas.forEach((m) => {
        m.checked = false
    })
   
    if(respostas.length == 0){
        mensagem = "Nenhuma meta selecionada"
        return
    }

    respostas.forEach((resposta) => {
        const meta = metas.find((m) => {
            return m.value == resposta
        })

        meta.checked = true
    })

    mensagem = 'meta(s) concluida(s)'
}

const metasRealizadas = async () => {
    if(metas.length == 0){
        mensagem = "nao existem metas!"
        return
    }
    const realizadas = metas.filter((meta) => {
        return meta.checked
    })
    if(realizadas.length == 0){
        mensagem = "nao existem metas realizadas!("
        return
    }

    await select({
        message: "metas realizadas:" + realizadas.length,
        choices:[...realizadas]
    })
}

const metasAbertas = async () => {
    if(metas.length == 0){
        mensagem = "nao existem metas!"
        return
    }
    const abertas = metas.filter((metas) => {
        return meta.checked != true
        })

        if (abertas.length == 0){
            mensagem = "nao existem metas abertas"
            return
        }

        await select({
            message: "metas abertas:" + abertas.length,
            choices: [...abertas]
        })
}


const deletarMetas =async ()=> {
    if(metas.length == 0){
        mensagem = "nao existem metas!"
        return
    }
    const metasDermacadas = metas.map((meta)=>{
        return {value: meta.value, checked: false}
    })
    const itensADeletar = await checkbox({
        message: "selecione o item para deletar",
        choices: [...metas],
        instructions: false,
    })

    if(itensADeletar == 0){
        mensagem = "nenhum item para deletar!"
        return
    }

    itensADeletar.forEach((item) => {
       metas = metas.filter((meta) => {
        return meta.value != item
       })
    })

    mensagem = "metas deletada(s) com sucesso!" 
}

const mostrarMensagens = () => {
    console.clear

    if(mensagem = ""){
        console.log(mensagem)
        console.log("")
        console.log = ""
    }
}

//agua [] - caminhar [] - cantar [x]

const start = async () => {
   await carregarMetas()

    while(true){

        await salvarMetas()
        mostrarMensagens()
         
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
                    name:"deletar metas",
                    value:"deletar"
                },
                {
                    name:"metas realizadas",
                    value:"realizadas"
                },
                {
                    name:"metas abertas",
                    value:"abertas"
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
                break
            case "listar":
                await listarMetas()
                break
            case "abertas":
                await metasAbertas()
                break
            case "deletar":
                await deletarMetas()
                break
            case "realizadas":
                await metasRealizadas()
                break
            case "sair":
                console.log("até a proxima!")
                return
        }
    }
    
    
    
}

start()