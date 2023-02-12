import { Card, Grid, Row, Text, Link } from '@nextui-org/react';

export default function App({ image_url, nama, harga, alamat }) {
  return (
    <Grid xs={6} sm={6}>
      <Card isHoverable>
        <Card.Body css={{ p: 0 }}>
          <Card.Image
            src={image_url[0].image_url}
            objectFit='cover'
            width='100%'
            height={320}
            // alt={item.title}
            alt='test'
          />
        </Card.Body>
        <Card.Footer css={{ justifyItems: 'flex-start' }}>
          <Row wrap='wrap' justify='space-between' align='center'>
            <Grid.Container justify='center'>
              <Grid xs={12}>
                <Text h4 css={{ lineHeight: '$xs' }}>
                  {nama}
                </Text>
              </Grid>
              <Grid xs={12}>
                <Text css={{ color: '$accents8' }}>{alamat}</Text>
              </Grid>
            </Grid.Container>
            <Text
              css={{
                color: '$accents7',
                fontWeight: '$semibold',
                fontSize: '$sm',
              }}
            >
              Rp.{harga}
            </Text>
          </Row>
        </Card.Footer>
      </Card>
    </Grid>
  );
}
