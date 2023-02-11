import { Text, Textarea, Grid, Button } from '@nextui-org/react';
import { withPageAuth } from '@supabase/auth-helpers-nextjs';
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react';
import { useState } from 'react';
import { useRouter } from 'next/router';
import Alert from '../components/Alert';

export default function Post() {
  const user = useUser();
  const supabaseClient = useSupabaseClient();
  const router = useRouter();
  const initialState = {
    title: '',
    jenis_olahraga: '',
    lokasi: '',
    partisipan: 0,
    content: '',
    whatsapp_group_link: '',
  };

  const [postData, setPostData] = useState(initialState);

  const handleChange = (e) => {
    setPostData({ ...postData, [e.target.name]: e.target.value });
  };

  const createArticle = async () => {
    try {
      const { data, error } = await supabaseClient
        .from('posts')
        .insert([
          {
            title: postData.title,
            jenis_olahraga: postData.jenis_olahraga,
            lokasi: postData.lokasi,
            partisipan: postData.partisipan,
            content: postData.content,
            whatsapp_group_link: postData.whatsapp_group_link,
            user_email: user?.email?.toLowerCase(),
            user_id: user?.id,
          },
        ])
        .single();
      if (error) throw error;
      alert('Postingan berhasil dibuat');
      setPostData(initialState);
      router.push('/');
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <Grid.Container gap={1}>
      <Text h3>Judul</Text>
      <Grid xs={12}>
        <Textarea
          name='title'
          aria-label='title'
          placeholder='Judul Postingan'
          fullWidth={true}
          rows={1}
          size='xl'
          onChange={handleChange}
        />
      </Grid>
      <Text h3>Jenis Olahraga</Text>
      <Grid xs={12}>
        <Textarea
          name='jenis_olahraga'
          aria-label='jenis_olahraga'
          placeholder='Jenis Olahraga'
          fullWidth={true}
          rows={1}
          size='xl'
          onChange={handleChange}
        />
      </Grid>
      <Text h3>Lokasi Olahraga</Text>
      <Grid xs={12}>
        <Textarea
          name='lokasi'
          aria-label='lokasi'
          placeholder='lokasi'
          fullWidth={true}
          rows={1}
          size='xl'
          onChange={handleChange}
        />
      </Grid>
      <Text h3>Partisipan</Text>
      <Grid xs={12}>
        <Textarea
          name='partisipan'
          aria-label='partisipan'
          placeholder='partisipan'
          fullWidth={true}
          typeof='number'
          rows={1}
          size='xl'
          onChange={handleChange}
        />
      </Grid>
      <Text h3>Deskripsi</Text>
      <Grid xs={12}>
        <Textarea
          name='content'
          aria-label='content'
          placeholder='content'
          fullWidth={true}
          rows={6}
          size='xl'
          onChange={handleChange}
        />
      </Grid>
      <Text h3>Link Group</Text>
      <Grid xs={12}>
        <Textarea
          name='whatsapp_group_link'
          aria-label='whatsapp_group_link'
          placeholder='whatsapp_group_link'
          fullWidth={true}
          rows={6}
          size='xl'
          onChange={handleChange}
        />
      </Grid>
      <Grid xs={12}>
        <Text>Posting as {user?.email}</Text>
      </Grid>
      <Button color={'secondary'} onPress={createArticle}>
        Create Article
      </Button>
    </Grid.Container>
  );
}
