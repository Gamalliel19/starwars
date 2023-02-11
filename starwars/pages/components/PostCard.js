import { Card, Text, Grid } from '@nextui-org/react';
import { Badge } from '@nextui-org/react';

export default function PostCard({
  title,
  content,
  jenis,
  partisipan,
  email,
  timestamp,
}) {
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

  const timeText = timeSince(timestamp);

  return (
    <div className='card-mt'>
      <Card>
        <Card.Header>
          <Grid.Container css={{ pl: '$6' }}>
            <Grid xs={12}>
              <Text h3 css={{ lineHeight: '$xs' }}>
                {title}
              </Text>
            </Grid>
            <Grid xs={12}>
              <Text css={{ color: '$accents8' }}>
                {email}, posted {timeText}
              </Text>
            </Grid>
          </Grid.Container>
        </Card.Header>
        <Card.Divider />
        <Card.Body css={{ py: '$10', pl: '$6' }}>
          <Text>{content}</Text>
        </Card.Body>
        <Card.Footer>
          <Badge
            enableShadow
            disableOutline
            color={'secondary'}
            css={{ mr: '$6' }}
          >
            {jenis}
          </Badge>
          <Badge enableShadow disableOutline color={'warning'}>
            Partisipan: {partisipan}
          </Badge>
        </Card.Footer>
      </Card>
    </div>
  );
}
