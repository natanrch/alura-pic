<template>

  <div class="corpo">
    <h1 class="centralizado">{{titulo}}</h1>
    <p v-show="mensagem" class="centralizado">{{ mensagem }}</p>
    <input type="search" name="filtro" placeholder="Filtre por nome" class="filtro" @input="filtro = $event.target.value">

    <ul v-for="foto of fotosComFiltro" class="lista-fotos">
      <li class="lista-fotos-item">
        <meu-painel :titulo="foto.titulo">
          <imagem-responsiva :url="foto.url" :titulo="foto.titulo" v-meu-transform:rotate.animate="15"></imagem-responsiva>
          <router-link :to="{ name: 'altera' , params: {id: foto._id}}">
            <meu-botao rotulo="alterar" tipo="button" />
          </router-link>
          <meu-botao rotulo="remover" tipo="button" @botaoAtivado="remove(foto)" :confirmacao="false" estilo="perigo"/>

        </meu-painel>
      </li>
    </ul>
  </div>

</template>

<script>
  import Painel from '../shared/painel/Painel.vue';
  import ImagemResponsiva from '../shared/imagem-responsiva/ImagemResponsiva.vue';
  import Botao from '../shared/botao/Botao.vue';

  import FotoService from '../../domain/foto/FotoService';

  export default {

    components: {
      'meu-painel' : Painel,
      'imagem-responsiva' : ImagemResponsiva,
      'meu-botao' : Botao,
    },
    computed: {
      fotosComFiltro() {
        if(this.filtro) {
          let exp = new RegExp(this.filtro.trim(), 'i');
          return this.fotos.filter(foto => exp.test(foto.titulo));
        } else {
          return this.fotos;
        }
      }
    },
    data() {
      return {
        titulo: 'Alurapic',
        fotos: [],
        filtro: '',
      }
    },
    created() {

      this.service = new FotoService(this.$resource);

      this.service.lista()
      .then(fotos => this.fotos = fotos, err => this.mensagem = err.message);
    },
    methods: {

     remove(foto) {
        
        this.service
          .apaga(foto._id)
          .then(
            () => {
              let indice = this.fotos.indexOf(foto);
              this.fotos.splice(indice, 1);
              this.mensagem = 'Foto removida com sucesso';
            }, 
            err => {this.mensagem = err.message, console.log(this.mensagem  )}
          )

      }
    }
  }
</script>

<style>
  .centralizado {
    text-align: center;
  }

  .corpo {
    font-family: Helvetica, sans-serif;
    margin: 0 auto;
    width: 96%;
  }

  .lista-fotos {
    list-style: none;
  }

  .lista-fotos {
    display: inline-block;
  }
  .lista-fotos-item {
    display: inline-block;
  }
  .imagem-responsiva {
    width: 100%;
  }
  .filtro {
    display: block;
    width: 100%;
  }
</style>
