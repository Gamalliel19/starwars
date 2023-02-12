import { Text, Textarea, Grid, Button, Spacer, Input } from '@nextui-org/react';
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react';
import { useState } from 'react';
import { useRouter } from 'next/router';

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

  const createPost = async () => {
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
      <Spacer y={2} />
      <Grid xs={12}>
        <Grid xs={6}>
          <Input
            underlined
            labelPlaceholder='Judul Postingan'
            color='secondary'
            name='title'
            aria-label='title'
            fullWidth={true}
            rows={1}
            size='xl'
            onChange={handleChange}
          />
        </Grid>
        <Grid xs={6}>
          <Input
            underlined
            labelPlaceholder='Jenis Olahraga'
            color='secondary'
            name='jenis_olahraga'
            aria-label='jenis_olahraga'
            fullWidth={true}
            rows={1}
            size='xl'
            onChange={handleChange}
          />
        </Grid>
      </Grid>
      <Spacer y={3} />
      <Grid xs={12}>
        <Grid xs={6}>
          <Input
            underlined
            labelPlaceholder='Partisipan'
            color='secondary'
            name='partisipan'
            aria-label='partisipan'
            fullWidth={true}
            typeof='number'
            rows={1}
            size='xl'
            onChange={handleChange}
          />
        </Grid>

        <Grid xs={6}>
          <Input
            underlined
            labelPlaceholder='Link Group'
            color='secondary'
            name='whatsapp_group_link'
            aria-label='whatsapp_group_link'
            fullWidth={true}
            rows={6}
            size='xl'
            onChange={handleChange}
          />
        </Grid>
      </Grid>

      <Spacer y={3} />
      <Grid xs={12}>
        <Textarea
          underlined
          labelPlaceholder='Lokasi Lapangan'
          color='secondary'
          name='lokasi'
          aria-label='lokasi'
          fullWidth={true}
          rows={3}
          size='xl'
          onChange={handleChange}
        />
      </Grid>

      <Spacer y={3} />
      <Grid xs={12}>
        <Textarea
          underlined
          labelPlaceholder='Deskripsi Lapangan'
          color='secondary'
          name='content'
          aria-label='content'
          fullWidth={true}
          rows={3}
          size='xl'
          onChange={handleChange}
        />
      </Grid>

      <Grid xs={12}>
        <Text>
          Posting as <span className='span'>{user?.email}</span>
        </Text>
      </Grid>
      <Button className='mt-16' color={'secondary'} onPress={createPost}>
        Create Post
      </Button>
    </Grid.Container>
  );
}
