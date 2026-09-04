(function() {
    const autenticacao = {
        usuario: null,
        pronta: null,
    };

    autenticacao.pronta = fetch("/me")
        .then(async function(resposta) {
            if (resposta.status === 401) {
                window.location.replace("login.html");
                return null;
            }

            if (!resposta.ok) {
                throw new Error("Não foi possível verificar a autenticação.");
            }

            const resultado = await resposta.json();
            autenticacao.usuario = resultado.usuario;
            return autenticacao.usuario;
        })
        .catch(function(error) {
            console.error(error.message);
            return null;
        });

    window.musicHubAuth = autenticacao;

    document.addEventListener("click", async function(event) {
        const linkLogout = event.target.closest(".logout");

        if (!linkLogout) {
            return;
        }

        event.preventDefault();

        try {
            const resposta = await fetch("/logout", {
                method: "POST",
            });
            const resultado = await resposta.json();

            if (resposta.ok) {
                window.location.href = "login.html";
                return;
            }

            alert(resultado.mensagem);
        } catch (error) {
            alert("Não foi possível conectar ao servidor.");
        }
    });
})();
