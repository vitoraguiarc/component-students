'use strict'

import {
    readStudents
} from './api.js'

const student = await readStudents()

const buscarAlunos = async () => {
    const container = document.getElementById('container-alunos')
    const alunos = await student
    const cards = alunos.map(createCard)
    container.replaceChildrem(...cards)
    return cards
}




class card extends HTMLElement {
    constructor(){
        super();
        this.build()
    }
    build () {
        const shadow = this.attachShadow({mode: 'open'})
        //anexa tudo ao shadow
        shadow.appendChild(this.style())
        shadow.appendChild(this.createCard())
    }

    //metodo responsavel por estilizar
    style(){
        const style = document.createElement('style')
        style.textContent = `
        .card {
            width: ${this.cardWidth()};
            height: ${this.cardHeight()};
            display: flex;
            flex-direction: column;
            justify-content: space-evenly;
            align-items: center;
            background-color: ${this.bgColor()};
        }
        
        .card-text{
            width: 50%;
            padding: 4px;
            text-align: center;
            text-transform: uppercase;
            color: ${this.colorNameAluno()};
            border-radius: 12px;
            box-shadow: 0 0 2px #000;
            background-color: ${this.bgColorAluno()};
            cursor: pointer;
            
        }
        
        .card-image {
            width: 50%;
            height: 50%;
            border-radius: 50%;
            background-image: ${this.image()};
            background-size: cover;
            box-shadow: inset 0 0 8px #000;
            background-color: #fff;
            cursor: pointer;
        }
        
        `

        return style
    }

    //cria a div
    createCard() {

        const card = document.createElement('div')
        card.classList.add('card')
        card.innerHTML = `
            <div class="card-text">${this.txtAluno()}</div>
            <div class="card-image"></div>
            <div class="card-text">${this.txtTurma()}</div>
            <div class="card-text">${this.txtStatus()}</div>

        `
        return card
    }

    bgColor() {
        const color = this.getAttribute('data-bg-color') ?? "#000"

        return color
    }

    txtAluno() {
        const aluno = this.getAttribute('data-txt-aluno') ?? 'ALUNO'

        return aluno
    }

    image() {
        const img = this.getAttribute('data-image') ?? 'url(./8.png)'

        return img
    }

    txtTurma() {
        const turma = this.getAttribute('data-txt-turma') ?? 'TURMA'

        return turma
    }

    cardWidth() {
        const width = this.getAttribute('data-width') ?? '250px'

        return width
    }

    cardHeight() {
        const height = this.getAttribute('data-height') ?? '250px'

        return height
    }

    colorNameAluno() {
        const colorAluno = this.getAttribute('data-color-aluno') ?? '#000'

        return colorAluno
    }

    bgColorAluno() {
        const bgAluno = this.getAttribute('data-bg-aluno') ?? '#fff'

        return bgAluno
    }

    txtStatus() {
        const status = this.getAttribute('data-txt-status') ?? 'NULO'
        return status
    }
}



//insire no html
customElements.define('card-aluno', card)