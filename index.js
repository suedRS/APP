

let meta = {
    value: 'ler um lviro por mês',
    checked: true,
}

let metas = [
    meta,
    {
        value: "caminhar 20 minutos todos os dias",
        checked: false
    }
]

meta.value = "não é mais ler im livro"
meta.log(meta.value)