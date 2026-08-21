import { SKILLS } from '@/content/projects/skills'

export default {
  title: 'Ray Tracer',
  date: '2024-11',
  url: 'https://github.com/sambrothers0/ray-tracer',
  skills: [SKILLS.CPP],
  thumbnail: '/img/projects/ray-tracer.png',
  body: `This is a program for rendering basic 3D shapes using ray tracing in C++. The program reads in a text file continaing formatted information about the color and position of the shapes and light source, and stores them in a linked list using C++ pointers. It then uses ray tracing to render each object in space and perform realistic lighting calculations based on the position of the light source. With this project, I learned the underlying algorithms behind basic ray tracing which are used to render everything from video games to spaceship models.`
}
