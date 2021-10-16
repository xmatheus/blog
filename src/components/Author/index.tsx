import Image from 'next/image'

import * as S from './style'

import EmailIcon from 'src/assets/email.svg'
import GitIcon from 'src/assets/git.svg'
import IgIcon from 'src/assets/ig.svg'

const Author = (): JSX.Element => {
  return (
    <S.Container>
      <S.WrapperUserInfo>
        <S.ImageAndUserName>
          <Image
            src={'/mf.jpg'}
            width={51}
            height={51}
            alt="Imagem preto e branca do autor do blog. Estou com os braços em cima de uma mesa e olhando para a camera que está do meu lado esquerdo"
          ></Image>

          <h1>
            Matheus Felipe <small>programador</small>
          </h1>
        </S.ImageAndUserName>

        <S.UserDescription>
          Sou graduando em Ciência da Computação, gosto de Front-end e UI/UX.
        </S.UserDescription>

        <S.WrapperIcons>
          <a
            href="https://github.com/xmatheus"
            target="_blank"
            title="github do autor"
            rel="noreferrer"
          >
            <GitIcon id="gitIcon" alt="icone do github" />
          </a>
          <a
            href="https://www.instagram.com/matheus.ftc/"
            target="_blank"
            title="instagram do autor"
            rel="noreferrer"
          >
            <IgIcon id="igIcon" alt="icone do instagram" />
          </a>
          <a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=matheuscorreia559@gmail.com&su=Olá Matheus :)&body=Cheguei aqui pelo blog"
            target="_blank"
            title="enviar um email para o autor"
            rel="noreferrer"
          >
            <EmailIcon id="emailIcon" alt="icone de email" />
          </a>
        </S.WrapperIcons>
      </S.WrapperUserInfo>
    </S.Container>
  )
}

export default Author
