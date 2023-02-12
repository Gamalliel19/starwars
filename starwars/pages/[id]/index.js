import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { Button, Card, Grid, Text, Link, Tooltip } from '@nextui-org/react';

export default function DetailPage() {
  const supabaseClient = useSupabaseClient();
  const router = useRouter();
  const user = useUser();
  const [post, setPost] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id } = router.query;

  useEffect(() => {
    const getPost = async () => {
      const { data, error } = await supabaseClient
        .from('posts')
        .select('*')
        .eq('id', id)
        .single();

      if (data != null) {
        setLoading(false);
        setPost(data);
      } else {
        console.log(error);
      }
    };
    if (typeof id !== 'undefined') {
      getPost();
    }
  }, [id]);

  if (loading) return <h1>Loading...</h1>;

  const timeSince = (timestamp) => {
    const now = new Date();
    const date = new Date(timestamp);
    const seconds = Math.floor((now - date) / 1000);
    let interval = Math.floor(seconds / 31536000);

    if (interval > 1) {
      return `${interval} years ago`;
    }
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) {
      return `${interval} months ago`;
    }
    interval = Math.floor(seconds / 86400);
    if (interval > 1) {
      return `${interval} days ago`;
    }
    interval = Math.floor(seconds / 3600);
    if (interval > 1) {
      return `${interval} hours ago`;
    }
    interval = Math.floor(seconds / 60);
    if (interval > 1) {
      return `${interval} minutes ago`;
    }
    return `${Math.floor(seconds)} seconds ago`;
  };

  const timeText = timeSince(post?.inserted_at);
  return (
    <>
      <Link href='/'>Back</Link>
      <Card>
        <Card.Header>
          <Grid.Container css={{ pl: '$6' }}>
            <Grid xs={12}>
              <Text h1 css={{ lineHeight: '$xs' }}>
                {post?.title}
              </Text>
            </Grid>
            <Grid xs={12}>
              <Text css={{ color: '$accents8' }}>
                Posted by <span className='span'>{post?.user_email}</span>{' '}
                {timeText}
              </Text>
            </Grid>
          </Grid.Container>
        </Card.Header>

        <Card.Body>
          <Grid.Container justify='center' css={{ pl: '$6' }}>
            <Grid xs={12}>
              <Text css={{ color: '$accents8' }}>Deskripsi</Text>
            </Grid>
            <Grid xs={12}>
              <Text h4 css={{ lineHeight: '$xs' }}>
                {post?.content}
              </Text>
            </Grid>
          </Grid.Container>

          <Grid.Container justify='center' css={{ pl: '$6' }}>
            <Grid xs={12}>
              <Text css={{ color: '$accents8' }}>Lokasi Lapangan</Text>
            </Grid>
            <Grid xs={12}>
              <Text h4 css={{ lineHeight: '$xs' }}>
                {post?.lokasi}
              </Text>
            </Grid>
          </Grid.Container>

          <Grid.Container justify='center' css={{ pl: '$6' }}>
            <Grid xs={12}>
              <Text css={{ color: '$accents8' }}>Jenis Olahraga</Text>
            </Grid>
            <Grid xs={12}>
              <Text h4 css={{ lineHeight: '$xs' }}>
                {post?.jenis_olahraga}
              </Text>
            </Grid>
          </Grid.Container>

          <Grid.Container justify='center' css={{ pl: '$6' }}>
            <Grid xs={12}>
              <Text css={{ color: '$accents8' }}>Jumlah Partisipan </Text>
            </Grid>
            <Grid xs={12}>
              <Text h4 css={{ lineHeight: '$xs' }}>
                {post?.partisipan}
              </Text>
            </Grid>
          </Grid.Container>
        </Card.Body>

        <Card.Footer>
          <Link href={post?.whatsapp_group_link} color={'success'} block>
            Join Group
          </Link>
          {/* <Grid>
          <Tooltip
            content='Join Whatsapp Group!'
            contentColor='success'
            color='white'
          ></Tooltip>
        </Grid>
        <Button color={'success'}>Edit</Button>
        <Button color={'error'}>Delete</Button> */}
        </Card.Footer>
      </Card>
    </>
  );
}
