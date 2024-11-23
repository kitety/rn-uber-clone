import { neon } from '@neondatabase/serverless';

const sql = neon(`${process.env.DATABASE_URL}`);

export async function POST(request: Request) {
  const { name, email, clerkId } = await request.json();
  if (!name || !email || !clerkId) {
    return Response.json({ error: 'Missing required fields' }, { status: 400 });
  }
  try {
    const response =
      await sql`INSERT INTO users (name, email, clerk_id) VALUES (${name}, ${email}, ${clerkId})`;
    return Response.json(JSON.stringify({ data: response }), {
      status: 201,
    });
  } catch (error) {
    console.log('error', error);
    return Response.json(
      { error },
      {
        status: 500,
      }
    );
  }
}
