export interface NoteDto {
  title: string,
  content: string
}

const BASE_URL = 'localhost:3000'

async function fetchNote() {
  // todo: type check somehow
  return (await fetch(`${BASE_URL}/note`)).json();
}
