import { NextApiRequest, NextApiResponse } from "next"

const urlStart = process.env.NODE_ENV === "development" ? "http://" : "https://"

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const hash = req.query.hash?.toString()

  // if (
  //   !hash ||
  //   !req.headers.referrer
  //     ?.toString()
  //     ?.replace(urlStart, "")
  //     ?.startsWith(req.headers.host)
  // )
  //   return res.status(404).send("Not found")

  const ipfsRes = await fetch(`${process.env.IPFS_GATEWAY}/${hash}`).then((image) =>
    image.blob()
  )

  const buffer = await ipfsRes.arrayBuffer()

  res.writeHead(200, {
    "Content-Type": ipfsRes.type,
    "Content-Length": Buffer.byteLength(buffer),
  })

  res.end(Buffer.from(buffer))
}

export default handler
