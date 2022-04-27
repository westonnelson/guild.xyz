import { NextApiRequest, NextApiResponse } from "next"

const guildUrl =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : // TODO: replace this with "https://guild.xyz"
      "https://guild.xyz"

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const hash = req.query.hash?.toString()
  console.log("Host:", req.headers.host, "Referrer:", req.headers.referer)

  // if (!hash || !req.headers.referrer?.toString()?.startsWith(guildUrl))
  //   return res.status(404).send("Not found")

  const ipfsRes = await fetch(`${process.env.IPFS_GATEWAY}/${hash}`).then((image) =>
    image.blob()
  )

  const buffer = await ipfsRes.arrayBuffer()

  res.writeHead(200, {
    "Content-Type": ipfsRes.type,
    "Content-Length": Buffer.byteLength(buffer),
  })

  return res.send(Buffer.from(buffer))
}

export default handler
