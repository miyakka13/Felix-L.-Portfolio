import { Navbar } from '@/components/Navbar'
import { Hero } from '@/components/Hero'
import { About } from '@/components/About'
import { Expertise } from '@/components/Expertise'
import { Experience } from '@/components/Experience'
import { Certifications } from '@/components/Certifications'
import { Education } from '@/components/Education'
import { Philosophy } from '@/components/Philosophy'
import { Contact } from '@/components/Contact'
import { Footer } from '@/components/Footer'

function App() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Expertise />
        <Experience />
        <Certifications />
        <Education />
        <Philosophy />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

export default App
