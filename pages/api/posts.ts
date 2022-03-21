import { NextApiHandler } from 'next'

const handler: NextApiHandler = async (req, res) => {
  if (req.method !== 'GET') {
    res.status(422).json({
      erorr: 'Unprocessable Entity',
    })
    return
  }

  await new Promise<void>(resolve => setTimeout(resolve, 1000))

  res.status(200).json([
    { id: 1, title: 'abc', content: 'def from api' },
    { id: 2, title: 'ghi', content: 'jkl' },
  ])
}

export default handler
