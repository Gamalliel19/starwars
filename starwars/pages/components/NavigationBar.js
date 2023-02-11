import {
  Navbar,
  Link,
  Text,
  Avatar,
  Dropdown,
  Button,
} from '@nextui-org/react';
import { icons } from './Icons';
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react';
import { useRouter } from 'next/router';

export default function NavigationBar() {
  const supabaseClient = useSupabaseClient();
  const router = useRouter();
  const user = useUser();
  const collapseItems = [
    'Features',
    'Customers',
    'Pricing',
    'Company',
    'Legal',
    'Team',
    'Help & Feedback',
    'Login',
    'Sign Up',
  ];

  function signOutUser() {
    supabaseClient.auth.signOut();
    router.push('/');
  }

  return (
    <Navbar shouldHideOnScroll isBordered>
      <Navbar.Toggle showIn='xs' />
      <Navbar.Brand
        css={{
          '@xs': {
            w: '12%',
          },
        }}
      >
        <Text b color='inherit' hideIn='xs'>
          SPORTIFY
        </Text>
      </Navbar.Brand>
      <Navbar.Content
        activeColor='secondary'
        enableCursorHighlight
        hideIn='xs'
        variant='underlined'
      >
        <Navbar.Link isActive href='/'>
          Home
        </Navbar.Link>
        <Navbar.Link href='/lapangan'>Cari Lapangan</Navbar.Link>
        <Dropdown isBordered>
          <Navbar.Item>
            <Dropdown.Button
              auto
              light
              css={{
                px: 0,
                dflex: 'center',
                svg: { pe: 'none' },
              }}
              iconRight={icons.chevron}
              ripple={false}
            >
              Features
            </Dropdown.Button>
          </Navbar.Item>
          <Dropdown.Menu
            aria-label='ACME features'
            css={{
              $$dropdownMenuWidth: '340px',
              $$dropdownItemHeight: '70px',
              '& .nextui-dropdown-item': {
                py: '$4',
                // dropdown item left icon
                svg: {
                  color: '$secondary',
                  mr: '$4',
                },
                // dropdown item title
                '& .nextui-dropdown-item-content': {
                  w: '100%',
                  fontWeight: '$semibold',
                },
              },
            }}
          >
            <Dropdown.Item
              key='autoscaling'
              showFullDescription
              description='ACME scales apps to meet user demand, automagically, based on load.'
              icon={icons.scale}
            >
              Akinator
            </Dropdown.Item>
            <Dropdown.Item
              key='usage_metrics'
              showFullDescription
              description='Real-time metrics to debug issues. Slow query added? We’ll show you exactly where.'
              icon={icons.activity}
            >
              Info Tournament
            </Dropdown.Item>
            <Dropdown.Item
              key='production_ready'
              showFullDescription
              description='ACME runs on ACME, join us and others serving requests at web scale.'
              icon={icons.flash}
            >
              Info Event
            </Dropdown.Item>
            <Dropdown.Item
              key='99_uptime'
              showFullDescription
              description='Applications stay on the grid with high availability and high uptime guarantees.'
              icon={icons.server}
            >
              Komunitas
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Navbar.Content>

      {!user ? (
        <>
          <Navbar.Content>
            <Navbar.Item>
              <Button auto flat as={Link} color={'secondary'} href='/login'>
                Login
              </Button>
            </Navbar.Item>
          </Navbar.Content>
        </>
      ) : (
        <>
          <Navbar.Content
            css={{
              '@xs': {
                w: '12%',
                jc: 'flex-end',
              },
            }}
          >
            <Dropdown placement='bottom-right'>
              <Navbar.Item>
                <Dropdown.Trigger>
                  <Avatar
                    bordered
                    as='button'
                    color='secondary'
                    text={user?.email[0]}
                    textColor={'white'}
                    size={'md'}
                  />
                </Dropdown.Trigger>
              </Navbar.Item>

              <Dropdown.Menu
                aria-label='User menu actions'
                color='secondary'
                onAction={(actionKey) => console.log({ actionKey })}
              >
                <Dropdown.Item key='profile' css={{ height: '$18' }}>
                  <Text b color='inherit' css={{ d: 'flex' }}>
                    Logged in as
                  </Text>
                  <Text b color='secondary' css={{ d: 'flex' }}>
                    {user?.email}
                  </Text>
                </Dropdown.Item>
                <Dropdown.Item key='posting' withDivider>
                  <Navbar.Link href='/post'>Post Pencarian</Navbar.Link>
                </Dropdown.Item>

                <Dropdown.Item
                  key='logout'
                  css={{ height: '$14' }}
                  withDivider
                  color='none'
                >
                  <Button flat color={'error'} onPress={() => signOutUser()}>
                    Log out
                  </Button>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Navbar.Content>
          <Navbar.Collapse>
            {collapseItems.map((item, index) => (
              <Navbar.CollapseItem
                key={item}
                activeColor='secondary'
                css={{
                  color: index === collapseItems.length - 1 ? '$error' : '',
                }}
                isActive={index === 2}
              >
                <Link
                  color='inherit'
                  css={{
                    minWidth: '100%',
                  }}
                  href='#'
                >
                  {item}
                </Link>
              </Navbar.CollapseItem>
            ))}
          </Navbar.Collapse>
        </>
      )}
    </Navbar>
  );
}
