---
title: 'Como melhorar interfaces com alguns passos simples'
author: 'Matheus Felipe'
summary: 'Em UI existe alguns conceitos que podem facilmente serem aplicados em diversas interfaces, nesse post eu lhe ensino um pouco sobre eles.'
tags: 'UI/UX, web-dev'
createdAt:
  iso: '2022-03-03T01:27:08.966Z'
  formated: '02 de Março de 2022'
---

Já tem um bom tempo que eu me aventuro no mundo de UI/UX e acredito que consigo compartilhar alguns conteúdos úteis e que possam ajudar no dia a dia. Então, vamos aprender sobre: Contraste, hierarquia visual, espaçamento e efeitos simples de sombreamento.

Obs.: não coloquei nenhuma cor fora nosso preto total(#000) e branco total(#fffff). Também evitei definir valores no texto, o objetivo é apenas conceitos e não padrões de tamanho, etc.

Utilizei o [Figma](http://figma.com/) para criar o card.

## 1 - Card de um carro com várias informações

Como exemplo prático, vamos imaginar que você estava desenvolvendo um card para uma loja de carros:

![Desktop - 10](https://user-images.githubusercontent.com/34286800/156477228-a27abf36-0482-4ebd-a9d6-fd88d2be592f.png)

Já da para perceber que não é uma das melhores interfaces, repare em como fica estranho se comparar com sites maiores.

## 2 - Organizando as informações

É sempre bom manter dados relacionados de maneira agrupada, para isso usamos o [espaço em branco](https://uxplanet.org/white-space-in-ui-design-8647d4f685a7). Ele não tem um peso visual tão grande — não fica nada bizarro e cheio de coisas para você se perguntar "O QUE É ISSO?" — e mantém a interface bem limpa e mínima. Você web dev conhecer esse espaço como `Margin` ou `Padding`.

Lembre-se de tentar manter uma mesma proporção de espaçamento para dados do mesmo grupo e espaços maiores entre grupos diferentes.

![Desktop - 11](https://user-images.githubusercontent.com/34286800/156477248-37cf1516-721a-4338-8b48-fa5c9dd7a295.png)

## 3 - Mudando o peso da fonte(font-weight) e o espaçamento interno(line-height) entre texto

Até agora nossos textos tinham apenas um peso 400/regular, mas mantendo todos iguais nós não conseguimos impor uma boa hierarquia visual. Vamos dar mais peso(semibold, bold) para informações mais relevantes.

Outra ponto importante: o espaçamento entre os textos estava pequeno, para resolver isso podemos calcular o line-height como o `font-size * 1.256 ou 1.4 ou 1.61`(prefiro usar 1.4).

Ex.: font-size de 16px -> line-height = 16 \* 1.4

![Desktop - 12](https://user-images.githubusercontent.com/34286800/156477252-37d2af33-525a-4d2f-83a5-44dc67fee220.png)

## 4 - Priorizar alguns dados e diminuir o contraste de outros

Iremos definir um título/label para os dados e diminuir a opacidade e font. O resultado será um texto descritivo e o dado em sí logo abaixo. utilizando desse formato, a estrutura dos detalhes do veículo ficam mais bem divididos e o usuário entende qual texto é uma dado e não apenas um título.

![Desktop - 13](https://user-images.githubusercontent.com/34286800/156477254-8e5dedd1-a2d6-485e-8b3d-b85600e0900b.png)

## 5 - Melhorando nosso Call to Action(CTA) ou button

Você percebeu que nosso botão era apenas um link bem simples e sem tanto peso? É... isso não é muito legal, ainda mais no caso de uma ação de compra. Vamos tranformar ele em um botão grande com máxima largura no grid(até onde o texto da descrição começa e termina), com um contraste alto e um leve sombreamento para dar um efeito de levitação. No texto nós podemos aumentar o letter-spacing e o font-size.

![Desktop - 14](https://user-images.githubusercontent.com/34286800/156477255-b0e85b96-db1b-4070-82d5-fd39fb6741c4.png)

## 6 - Contraste em texto sobre imagem

Esse Layout não é dos melhores, o preço está lá no lado esquerdo e em cima da imagem. Então, para evitar que dependendo da imagem o texto fique com um contraste péssimo e o usuário não consiga entender nada:

- Vamos aumentar essa font-size e mudar a cor para algo bem mais claro;
- Para aumentar o contraste basta adicionarmos um background na imagem com linear-gradient sendo escuro, lembre-se de adicionar mais opacidade em baixo e ir diminuindo para cima.

![Desktop - 15](https://user-images.githubusercontent.com/34286800/156477256-85a7fdb4-052f-4e42-870b-1ccaf88e8b0b.png)

## Resultado em um gif e link do figma

https://www.figma.com/file/eUHjkMYVBnDikQ970byfGe/blog?node-id=412%3A2

![Peek 02-03-2022 21-11](https://user-images.githubusercontent.com/34286800/156477067-f0765cae-d5c3-41ed-8a34-0ea0265a773d.gif)

## Até logo

Tudo que eu coloquei aí em cima não é uma regra que você deve seguir em todos os casos, cada interface deve ser analizada e compreendida, busque mais referências e teste. É sempre bom testar :)

É isso leitor random da internet, parabéns por chegar até aqui e até outro post.

> Agora que eu percebi que as imagens ficaram com a qualidade reduzida e o gif lento :|
>
> provavelmente foi por conta do upload das imagens nas issues do github hehe.
