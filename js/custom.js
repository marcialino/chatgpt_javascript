const formPerguntaChat = document.getElementById('form-pergunta-chat')

const OPENAI_API_KEY = "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"

//Verificar se tem a chave
if(OPENAI_API_KEY===""){
    document.getElementById('pergunta').innerHTML = "<span style='color:#f00;'>Necessário colocar a chave na API no arquivo custon.js</span>"
}
//Acessa o IF quando tem o SELETOR na página HTML
if(formPerguntaChat){

    //Aguarde o usuário clicar no botão enviar
    
    formPerguntaChat.addEventListener('submit', async (e) =>{

    //Bloquear o recarregamento da página
        
        e.preventDefault()

        //Substituir o texto do botão para "Pesquisando..."
        document.getElementById('btn-pergunta-chat').value = "Pesquisando..."

     //Receber o valor do campo pergunta
      let pergunta =  document.getElementById('campo-pergunta').value
      //console.log(pergunta)

      //Enviar o texto da pergunta para a página HTML
      document.getElementById('pergunta').innerHTML = pergunta

      //Limpar a resposta anterior
      document.getElementById('resposta').innerHTML = "<span></span>"

      //Requisição para chatGPT
      await fetch("https://api.openai.com/v1/completions", {

       //método para enviar os dados
        method: "POST",

        // dados enviados no cabeçalho da requisição
        headers:{
            Accept: "application/json", "Content-Type": "application/json",
            Authorization: "Bearer " + OPENAI_API_KEY,

        },
        //Enviar os dados no corpo da requisição

        body: JSON.stringify({
            model: "text-davinci-003" , //modelo
            prompt: pergunta,
            max_tokens: 2048,   // tamanho da resposta
            temperature: 0.5 // criatividade da resposta
        }),

      })
      //Acessa o then quando obtiver resposta
      .then((resposta) => resposta.json())
      .then ((dados) => {
        //console.log(dados)
        //console.log(dados.choices[0].text)

        //Enviar o texto da resposta para a página HTML

        document.getElementById('resposta').innerHTML = dados.choices[0].text
      })
      //Retorna cath quando gerar erro
      .catch(() =>{
        

        //Enviar o texto da resposta para a página HTML
        document.getElementById('resposta').innerHTML = "Sem resposta"
      })

      // Substituir o texto do botão para "Enviar"
      document.getElementById('btn-pergunta-chat').value = "Enviar"
    }) 
}