import Image from 'next/image'

import * as S from './style'

import EmailIcon from 'src/assets/email.svg'
import GitIcon from 'src/assets/git.svg'
import IgIcon from 'src/assets/ig.svg'

const Author: React.FC = () => {
  return (
    <S.Container>
      <S.WrapperUserInfo>
        <S.ImageAndUserName>
          <Image
            src={'/mf.jpg'}
            width={51}
            height={51}
            alt="Imagem do autor do blog"
          ></Image>

          <h1>
            Matheus Felipe <small>programa dor</small>
          </h1>
        </S.ImageAndUserName>

        <S.UserDescription>
          Sou graduando em ciência da computação e gosto de escrever uns cógidos
          :)
        </S.UserDescription>

        <S.WrapperIcons>
          <a
            href="https://github.com/xmatheus"
            target="_blank"
            title="github do autor"
            rel="noreferrer"
          >
            <GitIcon alt="icone do github" />
          </a>
          <a
            href="https://www.instagram.com/matheus.ftc/"
            target="_blank"
            title="instagram do autor"
            rel="noreferrer"
          >
            <IgIcon alt="icone do instagram" />
          </a>
          <a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=matheuscorreia559@gmail.com&su=Olá Matheus :)&body=Cheguei aqui pelo blog"
            target="_blank"
            title="enviar um email para o autor"
            rel="noreferrer"
          >
            <EmailIcon alt="icone de email" />
          </a>
        </S.WrapperIcons>
      </S.WrapperUserInfo>
    </S.Container>
  )
}

export default Author