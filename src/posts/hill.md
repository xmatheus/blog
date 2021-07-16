---
title: 'hill-climbing solucionando o problema das n-rainhas'
author: 'Matheus Felipe'
summary: O objetivo é achar uma posição para as rainhas que elas não se ataquem na horizontal, diagonal e vertical.
tags: 'Javascript, Nextjs, Life'
createdAt:
  iso: '2021-07-09T22:56:10.153Z'
  formated: 09 de Junho de 2021
---

## Algortimo hill-climbing solucionando o problema das n-rainhas

O objetivo é achar uma posição para as rainhas que elas não se ataquem na horizontal, diagonal e vertical.

> o algoritmo gera posições aleatórias para as rainhas.

## Visualização

https://xmatheus.github.io/hill-climbing-nRainhas/

### Necessário

> node >= 10.19.0

- [Nodejs](https://nodejs.org/en/)
- [Yarn](https://yarnpkg.com/)

## Como executar

### com visualização, mas com delay

![Screen Capture_select-area_20201012191616](https://user-images.githubusercontent.com/34286800/95798313-a6b37e00-0cbf-11eb-90a2-f99d812cdf4f.gif)

existe uma pasta chamada _public_ que contém o algoritmo, mas ele tem um delay e visualização das trocas de posição.

Você vai precisar executar o _[index.html](https://github.com/xmatheus/hill-climbing-nRainhas/blob/master/public/index.html)_ no navegador. Existe o lite-server que faz esse serviço.
Creio que arrastar ele para o navegador também funcione.

### sem visualização

o script `relatorio.js` gera 30 testes, 10 com 32 rainhas, 10 com 64 rainhas e 10 com 128 rainhas;
o resultado final é 3 JSON contendo os tempos de execução, memória usada e movimentos feitos + desvio padrão e variância.

> yarn relatorio

ou

> npm relatorio

### executar de maneira simplificada

abre o _index.js_ e chama um _console.log_ com a função init com parâmetro sendo a quantidade de rainhas:

> console.log(init(8))

É possível remover o comentário de uma [função](https://github.com/xmatheus/hill-climbing-nRainhas/blob/818115a84cd844da840b065eb8fd94642024d83b/index.js#L35) que mostra a matriz, porém ela só funciona para poucas rainhas.

Ficando assim para 8 rainhas:
![image](https://user-images.githubusercontent.com/34286800/95799370-6e616f00-0cc2-11eb-843d-e0d3be907375.png)
