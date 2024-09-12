const { select, input, checkbox} = require('@inquirer/prompts')

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

const listarMetas = async () => {
    const respostas = await checkbox({
        message: "use as setas para mudar de meta, o espaço para marcar ou desmarcar e o Enter para finalizar essa etapa",
        choices: [...metas],
        instructions:false,
    })

    metas.forEach((m) => {
        m.checked = false
    })
   
    if(respostas.length == 0){
        console.log("Nenhuma meta selecionada")
        return
    }

    respostas.forEach((resposta) => {
        const meta = metas.find((m) => {
            return m.value == resposta
        })

        meta.checked = true
    })

    console.log('meta(s) concluida(s)')
}

const metasRealizadas = async () => {
    const realizadas = metas.filter((meta) => {
        return meta.checked
    })
    if(realizadas.length == 0){
        console.log("nao existem metas realizadas! :(")
        return
    }

    await select({
        message: "metas realizadas:" + realizadas.length,
        choices:[...realizadas]
    })
}

const metasAbertas = async () => {
    const abertas = metas.filter((metas) => {
        return meta.checked != true
        })

        if (abertas.length == 0){
            console.log("nao existem metas abertas")
            return
        }

        await select({
            message: "metas abertas:" + abertas.length,
            choices: [...abertas]
        })
}


const deletarMetas =async ()=> {
    const metasDermacadas = metas.map((meta)=>{
        return {value: meta.value, checked: false}
    })
    const itensADeletar = await checkbox({
        message: "selecione o item para deletar",
        choices: [...metas],
        instructions: false,
    })

    if(itensADeletar == 0){
        console.log("nenhum item para deletar!")
        return
    }

    itensADeletar.forEach((item) => {
       metas = metas.filter((meta) => {
        return meta.value != item
       })
    })

    console.log("metas deletada(s) com sucesso!")
}



//agua [] - caminhar [] - cantar [x]

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
                console.log(metas)
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
                return
        }
    }
    
    
    
}

start()