<!DOCTYPE html>
<html lang="pt-br">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css">
    <script src="https://cdn.tailwindcss.com"></script>
</head>

<body class="overscroll-x-none bg-white min-h-screen">
    <header class="flex flex-wrap items-baseline p-5 md:p-10"> <!-- Logo -->
        <div
            class="w-24 h-24 md:w-32 md:h-32 bg-yellow-400 border-4 border-[#303638] rounded-[20px] rotate-[-5deg] flex items-center justify-center">
            <i class="fa-solid fa-graduation-cap text-[#303638] text-3xl md:text-4xl rotate-[5deg]"> </i> </div>
        <!-- Nome -->
        <h1 class="text-[#ed3945] text-2xl md:text-4xl font-bold mt-5 flex justify-baseline pl-5 md:pl-9"> Aprendendo
            XYZ - Aula 1 </h1>
    </header>
    <section id="video" class="mx-auto w-full md:w-1/2 flex flex-col items-center gap-6 p-5">
        <!-- Botão para criar conteúdo --> 
         <button id="btnCriar" type="button" class="bg-[#ed3945] text-white px-6 py-3 rounded-lg font-bold hover:opacity-90 transition"> 
            <i class="fa-solid fa-plus mr-2"></i> Criar conteúdo 
        </button> <!-- Caixa de criação -->
        <div id="caixaConteudo" class="hidden w-full flex-col gap-4"> <textarea id="conteudo" name="conteudo"
                placeholder="Digite o conteúdo aqui..."
                class="w-full min-h-40 border-2 border-[#303638] rounded-lg p-4 resize-y focus:outline-none focus:ring-2 focus:ring-[#ed3945]"> </textarea>
            <!-- Formulário -->
            <form action="receber.php" method="POST" class="w-full"> <input type="hidden" id="conteudoEnviar"
                    name="conteudo"> <button type="submit" id="btnEnviar"
                    class="w-full bg-[#303638] text-white px-6 py-3 rounded-lg font-bold hover:opacity-90 transition">
                    Enviar conteúdo </button> </form>
        </div>
    </section>
    <script> const btnCriar = document.getElementById("btnCriar"); const caixaConteudo = document.getElementById("caixaConteudo"); const conteudo = document.getElementById("conteudo"); const conteudoEnviar = document.getElementById("conteudoEnviar"); btnCriar.addEventListener("click", function () { caixaConteudo.classList.remove("hidden"); caixaConteudo.classList.add("flex"); btnCriar.classList.add("hidden"); conteudo.focus(); }); document.getElementById("btnEnviar").addEventListener("click", function () { conteudoEnviar.value = conteudo.value; }); </script>
</body>

</html>