'use strict'

const url = 'https://testeleonid.herokuapp.com/alunos'

const readStudents = async (id='') => {
    const response = await fetch(`${url}/${id}`)
    return await response.json()
}

export {
    readStudents
}
 