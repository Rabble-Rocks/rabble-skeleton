## Note: this is an experimental project and heavily under development.
If you do come across this repository, and you would like to support development, adding a :star: would be awesome!

![Rabble](https://i.imgur.com/UN19ZAJ.png "Rabble login screen")

# Getting started
- Install the project by running
```shell
composer create-project rabble/skeleton
```
- Copy `.env.dist` to `.env.local` and set your environment variables.
- Run the following command:
```shell
php bin/console rabble:admin:build dev
```
- Access the admin panel by going to <your-domain-here>/admin
- Have fun!

Note: You can add your own content types, content blocks, snippets and menus in the following directories using yaml, xml or php configuration:
- `config/packages/content_blocks`
- `config/packages/content_types` (there is an example content type present)
- `config/packages/snippets`
- `config/packages/rabble_menu.yaml`

More documentation on how to add fields and configure your content metadata will soon be available.

---

# What is Rabble?
Rabble is an experimental agnostic administrator system with built-in features like user and permission management, searching and content management features.

At the moment, I am mainly focussing on the content management aspect, but once an MVP has been established, you can expect to see more features.

### Features
At the moment, Rabble has a few features. In short, you can sum it up as user management, permission management, searching and some basic CMS features.

Of course, it is more than that. Using the Symfony framework, Rabble is designed to be fully customizable. For instance, you can add custom items to the main menu, system tray, implement your own search provider and even replace entire bundles by your own if you don't like what I've built so far!

### Adminator admin theme
The admin UI is based upon the versatile [Adminator](https://github.com/puikinsh/Adminator-admin-dashboard) theme with some custom additions to allow seamless integration with Rabble.
Unfortunately, there is no React support at this moment. The UI is completely Twig / jQuery based. On one hand, that does make adding new scripts or changing existing ones a little bit easier.

### So what about that CMS you keep talking about?
Sure, Rabble is in its basic form an agnostic admin system, but for me, a lot of focus goes towards making CMS accessible to people of the modern age.
Most content management systems right now are either way too outdated or bulky (like for instance WordPress, Drupal or Joomla (does anyone even use that still?)). Or have a very steep learning curve for adding new stuff, for example Sulu.

My goal is to build a CMS that's easy to extend and just uses Symfony's basic features like forms and events.

Some of the features included already are:
- Adding content type using Symfony configuration files
- A PHPCR back-end storage system
- Elasticsearch indexing (this is actually required to run the CMS)
- Image uploading, cropping, scaling and filtering using Liip imagine
- A router that allows you to link to a page using its UUID
- A menu bundle for creating menus (built using the KnpMenuBundle)
- Snippets
- Content blocks (basically a collection of items with dynamic fields)
- Translation support
- And a lot more to come!

### Please report bugs
Even though this project is still very young, I do appreciate bug reports, feedback, contributions and interactions of any kind!