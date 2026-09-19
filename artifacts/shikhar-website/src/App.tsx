import React, { useEffect } from "react";
import { Switch, Route, Link, useLocation } from "wouter";
import { ExternalLink, ArrowUpRight, Cpu, Search, Briefcase, ChevronRight, Menu, X, ShieldCheck, LineChart, Scale } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

function useScrollReveal() {
  const [location] = useLocation();
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("opacity-100", "translate-y-0");
            entry.target.classList.remove("opacity-0", "translate-y-8");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    document.querySelectorAll(".reveal-on-scroll").forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, [location]);
}

function Navigation() {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    setMobileMenuOpen(false);
  }, [location]);

  const links = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Research", href: "/research" },
    { name: "Philosophy", href: "/philosophy" },
  ];

  const isActive = (href: string) => {
    if (href === "/") return location === "/";
    return location.startsWith(href);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm py-3" : "bg-white/90 backdrop-blur-md border-b border-gray-100 py-5"
      }`}
    >
      <div className="container mx-auto px-6 max-w-5xl flex items-center justify-between">
        <Link href="/" className="text-lg font-semibold tracking-tight text-slate-900 group flex items-center gap-2">
          <div className="w-6 h-6 bg-slate-900 text-white flex items-center justify-center rounded-sm text-xs group-hover:bg-primary transition-colors">
            S
          </div>
          <span className="hidden sm:inline-block">Shikhar Haldia</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`text-sm font-medium transition-colors ${
                isActive(link.href)
                  ? "text-primary border-b-2 border-primary pb-0.5"
                  : "text-slate-600 hover:text-primary"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Mobile Nav Toggle */}
        <button
          className="md:hidden p-2 text-slate-600"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-gray-100 shadow-lg p-4 flex flex-col gap-4">
          {links.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`text-sm font-medium p-2 rounded-md ${
                isActive(link.href)
                  ? "text-primary bg-blue-50"
                  : "text-slate-600 hover:bg-slate-50"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}

function Footer() {
  return (
    <footer className="bg-slate-950 py-8 border-t border-slate-800">
      <div className="container mx-auto px-6 max-w-5xl flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="text-slate-400 text-sm">
          &copy; {new Date().getFullYear()} Shikhar Haldia. All rights reserved.
        </div>
        <div className="text-slate-500 text-xs text-center md:text-right max-w-xs">
          The research provided on this website is for informational purposes only and does not constitute investment advice.
        </div>
      </div>
    </footer>
  );
}

function HomePage() {
  useScrollReveal();
  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 selection:bg-primary selection:text-white">
      <Navigation />
      <main>
        <section className="pt-32 pb-20 md:pt-48 md:pb-32 container mx-auto px-6 max-w-5xl min-h-[90vh] flex flex-col justify-center">
          <div className="max-w-3xl reveal-on-scroll opacity-0 translate-y-8 transition-all duration-700 ease-out">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-primary text-xs font-semibold tracking-wide mb-6 border border-blue-100">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-40"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              Independent Equity Research
            </div>

            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-slate-900 mb-4 leading-tight">
              Shikhar Haldia
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 font-light mb-8 max-w-2xl leading-relaxed">
              Aspiring Investor <span className="mx-2 text-slate-300">|</span> Fundamental Equity Research
            </p>

            <p className="text-base md:text-lg text-slate-600 mb-10 max-w-2xl leading-relaxed">
              I conduct independent equity research on publicly traded companies, focusing on businesses with strong competitive advantages, solid financial performance, and long-term growth potential. My goal is to better understand how great companies create value by analyzing their financial statements, business models, competitive positioning, and industry trends.
            </p>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-white rounded-md px-8">
                <a href="https://drive.google.com/file/d/1BUNl2DoEaeoipyZWONrs5marJctgblH6/view?usp=share_link" target="_blank" rel="noopener noreferrer">
                  View Latest Research <ArrowUpRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
              <div className="text-sm text-slate-500 font-medium">
                Featured: NVIDIA Corporation (NVDA)
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mt-20 reveal-on-scroll opacity-0 translate-y-8 transition-all duration-700 delay-200 ease-out">
            <Card className="border-slate-100 shadow-sm hover:shadow-md transition-shadow bg-white/50 backdrop-blur-sm">
              <CardHeader className="pb-3">
                <Cpu className="w-6 h-6 text-primary mb-2" />
                <CardTitle className="text-base">AI & Semiconductors</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Researching AI infrastructure, semiconductor companies, emerging technologies, and the trends shaping the industry.
                </p>
              </CardContent>
            </Card>

            <Card className="border-slate-100 shadow-sm hover:shadow-md transition-shadow bg-white/50 backdrop-blur-sm">
              <CardHeader className="pb-3">
                <ShieldCheck className="w-6 h-6 text-primary mb-2" />
                <CardTitle className="text-base">Business Quality</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Evaluating competitive moats, market leadership, customer switching costs, and other factors that contribute to long-term success.
                </p>
              </CardContent>
            </Card>

            <Card className="border-slate-100 shadow-sm hover:shadow-md transition-shadow bg-white/50 backdrop-blur-sm">
              <CardHeader className="pb-3">
                <LineChart className="w-6 h-6 text-primary mb-2" />
                <CardTitle className="text-base">Valuation & Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Using financial metrics such as P/E ratios, earnings growth, and valuation methods to determine whether a company is trading at a reasonable price.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

function AboutPage() {
  useScrollReveal();
  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 selection:bg-primary selection:text-white">
      <Navigation />
      <main>
        <section className="pt-32 pb-24 bg-slate-50/50">
          <div className="container mx-auto px-6 max-w-5xl">
            <div className="grid md:grid-cols-[1fr_2fr] gap-12 lg:gap-20">
              <div className="reveal-on-scroll opacity-0 translate-y-8 transition-all duration-700 ease-out">
                <h2 className="text-3xl font-bold text-slate-900 tracking-tight mb-4">About Me</h2>
                <div className="w-12 h-1 bg-primary rounded-full mb-8"></div>

                <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
                  <div className="aspect-square bg-slate-100 rounded-lg mb-4 overflow-hidden">
                    <img
                      src="/shikhar-profile.png"
                      alt="Shikhar Haldia"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="font-semibold text-slate-900">Shikhar Haldia</h3>
                  <p className="text-sm text-slate-500 mb-4">High School Student & Independent Researcher</p>
                  <div className="flex gap-3">
                    <Button variant="outline" size="sm" className="w-full text-xs">
                      <a href="mailto:contact@example.com">Contact</a>
                    </Button>
                  </div>
                </div>
              </div>

              <div className="space-y-6 text-slate-600 text-base md:text-lg leading-relaxed font-light reveal-on-scroll opacity-0 translate-y-8 transition-all duration-700 delay-100 ease-out">
                <p className="text-slate-900 font-medium">
                  Hi, I'm Shikhar Haldia, a high school student with a passion for investing, business analysis, and understanding how great companies create long-term value.
                </p>

                <p>
                  I created this website to document my journey as an investor and to share independent equity research on publicly traded companies. Rather than focusing on short-term market movements, I'm interested in studying businesses from a long-term perspective by analyzing their financial performance, competitive advantages, industry dynamics, and valuation.
                </p>

                <p>
                  My interest in investing comes from a desire to understand how businesses operate and why some companies consistently outperform others. Every research report I publish is an opportunity to strengthen my analytical thinking, improve my understanding of financial statements, and develop a disciplined investment process.
                </p>

                <p>
                  My research process typically begins with understanding a company's business model and industry. From there, I analyze financial statements, evaluate competitive positioning, review management's strategy, assess potential risks, and develop an investment thesis based on the information available.
                </p>

                <p>
                  Beyond investing, I enjoy pursuing activities that challenge me to think critically and solve complex problems. Competitive chess has strengthened my ability to recognize patterns, evaluate positions, and make decisions under pressure—skills that also apply to investment research. I also enjoy tutoring and helping other students learn, which has reinforced the importance of clear communication and continuous learning.
                </p>

                <p>
                  This website serves as a record of my progress as I continue developing my knowledge of investing and financial analysis. As I publish new research and refine my investment approach, I hope this collection of work reflects both my curiosity and my commitment to becoming a better investor.
                </p>

                <p className="italic text-slate-500 pt-4 border-t border-slate-200">
                  Thank you for visiting, and I hope you find my research informative and insightful.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

function ResearchPage() {
  useScrollReveal();
  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 selection:bg-primary selection:text-white">
      <Navigation />
      <main>
        <section className="pt-32 pb-24">
          <div className="container mx-auto px-6 max-w-5xl">
            <div className="max-w-2xl mb-16 reveal-on-scroll opacity-0 translate-y-8 transition-all duration-700 ease-out">
              <h2 className="text-3xl font-bold text-slate-900 tracking-tight mb-4">Equity Research</h2>
              <div className="w-12 h-1 bg-primary rounded-full mb-6"></div>
              <p className="text-lg text-slate-600 font-light leading-relaxed">
                Independent, fundamental research focusing on business quality, sustainable competitive advantages, and long-term value creation.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <Card className="flex flex-col h-full border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300 reveal-on-scroll opacity-0 translate-y-8 ease-out group">
                <CardHeader className="border-b border-slate-100 bg-slate-50/50 pb-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-8 h-8 rounded-full bg-green-50 text-green-600 flex items-center justify-center text-xs font-bold ring-1 ring-green-100">
                      N
                    </div>
                  </div>
                  <CardTitle className="text-xl leading-tight mb-2 group-hover:text-primary transition-colors">
                    NVIDIA Corporation (NVDA)
                  </CardTitle>
                  <CardDescription className="text-sm">
                    Semiconductors & AI Infrastructure
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6 flex-grow flex flex-col">
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div>
                      <div className="text-xs text-slate-500 font-medium mb-1 uppercase tracking-wider">Rating</div>
                      <div className="font-semibold text-slate-900">HOLD</div>
                    </div>
                    <div>
                      <div className="text-xs text-slate-500 font-medium mb-1 uppercase tracking-wider">Target</div>
                      <div className="font-semibold text-slate-900">$225</div>
                    </div>
                    <div>
                      <div className="text-xs text-slate-500 font-medium mb-1 uppercase tracking-wider">Return</div>
                      <div className="font-semibold text-green-600">+9.7%</div>
                    </div>
                  </div>

                  <Separator className="mb-6" />

                  <p className="text-slate-600 text-sm leading-relaxed mb-8 flex-grow">
                    This report analyzes NVIDIA's competitive position in AI computing, financial performance, valuation, and long-term investment outlook.
                  </p>

                  <Button asChild className="w-full mt-auto bg-slate-900 hover:bg-primary text-white transition-colors">
                    <a href="https://drive.google.com/file/d/1BUNl2DoEaeoipyZWONrs5marJctgblH6/view?usp=share_link" target="_blank" rel="noopener noreferrer">
                      Read Full Report <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </CardContent>
              </Card>

              <Card className="flex flex-col h-full border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300 reveal-on-scroll opacity-0 translate-y-8 ease-out delay-100 group">
                <CardHeader className="border-b border-slate-100 bg-slate-50/50 pb-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center text-xs font-bold ring-1 ring-blue-100">
                      A
                    </div>
                  </div>
                  <CardTitle className="text-xl leading-tight mb-2 group-hover:text-primary transition-colors">
                    Apple Inc. (AAPL)
                  </CardTitle>
                  <CardDescription className="text-sm">
                    Consumer Technology & Services
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6 flex-grow flex flex-col">
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div>
                      <div className="text-xs text-slate-500 font-medium mb-1 uppercase tracking-wider">Rating</div>
                      <div className="font-semibold text-slate-900">HOLD</div>
                    </div>
                    <div>
                      <div className="text-xs text-slate-500 font-medium mb-1 uppercase tracking-wider">Target</div>
                      <div className="font-semibold text-slate-900">$360.00</div>
                    </div>
                    <div>
                      <div className="text-xs text-slate-500 font-medium mb-1 uppercase tracking-wider">Return</div>
                      <div className="font-semibold text-green-600">+8.6%</div>
                    </div>
                  </div>

                  <Separator className="mb-6" />

                  <p className="text-slate-600 text-sm leading-relaxed mb-8 flex-grow">
                    This report examines Apple's ecosystem strength, services growth trajectory, hardware innovation cycle, and long-term value creation potential.
                  </p>

                  <Button asChild className="w-full mt-auto bg-slate-900 hover:bg-primary text-white transition-colors">
                    <a href="https://drive.google.com/file/d/1OCcFIFC0ImoaE5UJGZAbV9xlCUOnYRA2/view?usp=sharing" target="_blank" rel="noopener noreferrer">
                      Read Full Report <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </CardContent>
              </Card>

              <Card className="flex flex-col h-full border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300 reveal-on-scroll opacity-0 translate-y-8 ease-out delay-200 group">
                <CardHeader className="border-b border-slate-100 bg-slate-50/50 pb-6">
                  <div className="flex justify-between items-start mb-4">
                    <Badge variant="outline" className="bg-white text-xs font-semibold px-2 py-1 tracking-wider uppercase text-slate-500 border-slate-200">
                      Research Report
                    </Badge>
                    <div className="w-8 h-8 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center text-xs font-bold ring-1 ring-amber-100">
                      J
                    </div>
                  </div>
                  <CardTitle className="text-xl leading-tight mb-2 group-hover:text-primary transition-colors">
                    JPMorgan Chase & Co. (JPM)
                  </CardTitle>
                  <CardDescription className="text-sm">
                    Financial Services & Banking
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6 flex-grow flex flex-col">
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div>
                      <div className="text-xs text-slate-500 font-medium mb-1 uppercase tracking-wider">Rating</div>
                      <div className="font-semibold text-slate-900">HOLD</div>
                    </div>
                    <div>
                      <div className="text-xs text-slate-500 font-medium mb-1 uppercase tracking-wider">Target</div>
                      <div className="font-semibold text-slate-900">$365.00</div>
                    </div>
                    <div>
                      <div className="text-xs text-slate-500 font-medium mb-1 uppercase tracking-wider">Return</div>
                      <div className="font-semibold text-green-600">+7.0%</div>
                    </div>
                  </div>

                  <Separator className="mb-6" />

                  <p className="text-slate-600 text-sm leading-relaxed mb-8 flex-grow">
                    This report evaluates JPMorgan's financial strength, diversified business model, competitive position, and long-term investment outlook.
                  </p>

                  <Button asChild className="w-full mt-auto bg-slate-900 hover:bg-primary text-white transition-colors">
                    <a href="https://drive.google.com/file/d/1zyfEatB8sTvQkCC0Mx40yCBBuGdU0g0Q/view?usp=sharing" target="_blank" rel="noopener noreferrer">
                      Read Full Report <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </CardContent>
              </Card>

              <Card className="flex flex-col h-full border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300 reveal-on-scroll opacity-0 translate-y-8 ease-out delay-300 group">
                <CardHeader className="border-b border-slate-100 bg-slate-50/50 pb-6">
                  <div className="flex justify-between items-start mb-4">
                    <Badge variant="outline" className="bg-white text-xs font-semibold px-2 py-1 tracking-wider uppercase text-slate-500 border-slate-200">
                      Research Report
                    </Badge>
                    <div className="w-8 h-8 rounded-full bg-orange-50 text-orange-600 flex items-center justify-center text-xs font-bold ring-1 ring-orange-100">
                      C
                    </div>
                  </div>
                  <CardTitle className="text-xl leading-tight mb-2 group-hover:text-primary transition-colors">
                    Crocs, Inc. (CROX)
                  </CardTitle>
                  <CardDescription className="text-sm">
                    Footwear & Consumer Products
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6 flex-grow flex flex-col">
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div>
                      <div className="text-xs text-slate-500 font-medium mb-1 uppercase tracking-wider">Rating</div>
                      <div className="font-semibold text-green-600">BUY</div>
                    </div>
                    <div>
                      <div className="text-xs text-slate-500 font-medium mb-1 uppercase tracking-wider">Target</div>
                      <div className="font-semibold text-slate-900">$140.00</div>
                    </div>
                    <div>
                      <div className="text-xs text-slate-500 font-medium mb-1 uppercase tracking-wider">Return</div>
                      <div className="font-semibold text-green-600">+29.6%</div>
                    </div>
                  </div>

                  <Separator className="mb-6" />

                  <p className="text-slate-600 text-sm leading-relaxed mb-8 flex-grow">
                    This report analyzes Crocs' brand strength, growth opportunities, financial performance, and long-term investment potential.
                  </p>

                  <Button asChild className="w-full mt-auto bg-slate-900 hover:bg-primary text-white transition-colors">
                    <a href="https://drive.google.com/file/d/1yoCAZsfBLiqyAMa-3OPYAHAXg43EuKN3/view?usp=sharing" target="_blank" rel="noopener noreferrer">
                      Read Full Report <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </CardContent>
              </Card>

              <Card className="flex flex-col h-full border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300 reveal-on-scroll opacity-0 translate-y-8 ease-out delay-400 group">
                <CardHeader className="border-b border-slate-100 bg-slate-50/50 pb-6">
                  <div className="flex justify-between items-start mb-4">
                    <Badge variant="outline" className="bg-white text-xs font-semibold px-2 py-1 tracking-wider uppercase text-slate-500 border-slate-200">
                      Research Report
                    </Badge>
                    <div className="w-8 h-8 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center text-xs font-bold ring-1 ring-purple-100">
                      Y
                    </div>
                  </div>
                  <CardTitle className="text-xl leading-tight mb-2 group-hover:text-primary transition-colors">
                    YETI Holdings, Inc. (YETI)
                  </CardTitle>
                  <CardDescription className="text-sm">
                    Outdoor Products & Consumer Goods
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6 flex-grow flex flex-col">
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div>
                      <div className="text-xs text-slate-500 font-medium mb-1 uppercase tracking-wider">Rating</div>
                      <div className="font-semibold text-slate-900">HOLD</div>
                    </div>
                    <div>
                      <div className="text-xs text-slate-500 font-medium mb-1 uppercase tracking-wider">Target</div>
                      <div className="font-semibold text-slate-900">$50.00</div>
                    </div>
                    <div>
                      <div className="text-xs text-slate-500 font-medium mb-1 uppercase tracking-wider">Return</div>
                      <div className="font-semibold text-green-600">+11.0%</div>
                    </div>
                  </div>

                  <Separator className="mb-6" />

                  <p className="text-slate-600 text-sm leading-relaxed mb-8 flex-grow">
                    This report evaluates YETI's brand strength, product portfolio, growth opportunities, and long-term investment outlook.
                  </p>

                  <Button asChild className="w-full mt-auto bg-slate-900 hover:bg-primary text-white transition-colors">
                    <a href="https://drive.google.com/file/d/1S9qrrNqf1YUqeIE2vunsycgBBjaqqUcR/view?usp=sharing" target="_blank" rel="noopener noreferrer">
                      Read Full Report <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </CardContent>
              </Card>

              <Card className="flex flex-col h-full border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300 reveal-on-scroll opacity-0 translate-y-8 ease-out delay-500 group">
                <CardHeader className="border-b border-slate-100 bg-slate-50/50 pb-6">
                  <div className="flex justify-between items-start mb-4">
                    <Badge variant="outline" className="bg-white text-xs font-semibold px-2 py-1 tracking-wider uppercase text-slate-500 border-slate-200">
                      Research Report
                    </Badge>
                    <div className="w-8 h-8 rounded-full bg-cyan-50 text-cyan-600 flex items-center justify-center text-xs font-bold ring-1 ring-cyan-100">
                      C
                    </div>
                  </div>
                  <CardTitle className="text-xl leading-tight mb-2 group-hover:text-primary transition-colors">
                    Cloudflare, Inc. (NET)
                  </CardTitle>
                  <CardDescription className="text-sm">
                    Cloud Infrastructure & Cybersecurity
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6 flex-grow flex flex-col">
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div>
                      <div className="text-xs text-slate-500 font-medium mb-1 uppercase tracking-wider">Rating</div>
                      <div className="font-semibold text-green-600">BUY</div>
                    </div>
                    <div>
                      <div className="text-xs text-slate-500 font-medium mb-1 uppercase tracking-wider">Target</div>
                      <div className="font-semibold text-slate-900">$320.00</div>
                    </div>
                    <div>
                      <div className="text-xs text-slate-500 font-medium mb-1 uppercase tracking-wider">Return</div>
                      <div className="font-semibold text-green-600">+30.6%</div>
                    </div>
                  </div>

                  <Separator className="mb-6" />

                  <p className="text-slate-600 text-sm leading-relaxed mb-8 flex-grow">
                    This report examines Cloudflare's edge network, cybersecurity platform, growth opportunities, and long-term investment potential.
                  </p>

                  <Button asChild className="w-full mt-auto bg-slate-900 hover:bg-primary text-white transition-colors">
                    <a href="https://drive.google.com/file/d/12thVC3COlHFFkgSvNb3MIAgf3Q0_QPW3/view?usp=sharing" target="_blank" rel="noopener noreferrer">
                      Read Full Report <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </CardContent>
              </Card>

              <Card className="flex flex-col h-full border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300 reveal-on-scroll opacity-0 translate-y-8 ease-out delay-700 group">
                <CardHeader className="border-b border-slate-100 bg-slate-50/50 pb-6">
                  <div className="flex justify-between items-start mb-4">
                    <Badge variant="outline" className="bg-white text-xs font-semibold px-2 py-1 tracking-wider uppercase text-slate-500 border-slate-200">
                      Research Report
                    </Badge>
                    <div className="w-8 h-8 rounded-full bg-pink-50 text-pink-600 flex items-center justify-center text-xs font-bold ring-1 ring-pink-100">
                      F
                    </div>
                  </div>
                  <CardTitle className="text-xl leading-tight mb-2 group-hover:text-primary transition-colors">
                    Five Below, Inc. (FIVE)
                  </CardTitle>
                  <CardDescription className="text-sm">
                    Discount Retail & Consumer Products
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6 flex-grow flex flex-col">
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div>
                      <div className="text-xs text-slate-500 font-medium mb-1 uppercase tracking-wider">Rating</div>
                      <div className="font-semibold text-green-600">BUY</div>
                    </div>
                    <div>
                      <div className="text-xs text-slate-500 font-medium mb-1 uppercase tracking-wider">Target</div>
                      <div className="font-semibold text-slate-900">$285.00</div>
                    </div>
                    <div>
                      <div className="text-xs text-slate-500 font-medium mb-1 uppercase tracking-wider">Return</div>
                      <div className="font-semibold text-green-600">+20.3%</div>
                    </div>
                  </div>

                  <Separator className="mb-6" />

                  <p className="text-slate-600 text-sm leading-relaxed mb-8 flex-grow">
                    This report analyzes Five Below's value-focused retail model, store expansion opportunities, financial performance, and long-term growth potential.
                  </p>

                  <Button asChild className="w-full mt-auto bg-slate-900 hover:bg-primary text-white transition-colors">
                    <a href="https://drive.google.com/file/d/1eKj2x2THSQuuj24RfWTTru80vAcuaBG0/view?usp=sharing" target="_blank" rel="noopener noreferrer">
                      Read Full Report <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </CardContent>
              </Card>

              <Card className="flex flex-col h-full border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300 reveal-on-scroll opacity-0 translate-y-8 ease-out delay-800 group">
                <CardHeader className="border-b border-slate-100 bg-slate-50/50 pb-6">
                  <div className="flex justify-between items-start mb-4">
                    <Badge variant="outline" className="bg-white text-xs font-semibold px-2 py-1 tracking-wider uppercase text-slate-500 border-slate-200">
                      Research Report
                    </Badge>
                    <div className="w-8 h-8 rounded-full bg-red-50 text-red-600 flex items-center justify-center text-xs font-bold ring-1 ring-red-100">
                      S
                    </div>
                  </div>
                  <CardTitle className="text-xl leading-tight mb-2 group-hover:text-primary transition-colors">
                    SharkNinja, Inc. (SN)
                  </CardTitle>
                  <CardDescription className="text-sm">
                    Consumer Products & Appliances
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6 flex-grow flex flex-col">
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div>
                      <div className="text-xs text-slate-500 font-medium mb-1 uppercase tracking-wider">Rating</div>
                      <div className="font-semibold text-green-600">BUY</div>
                    </div>
                    <div>
                      <div className="text-xs text-slate-500 font-medium mb-1 uppercase tracking-wider">Target</div>
                      <div className="font-semibold text-slate-900">$125.00</div>
                    </div>
                    <div>
                      <div className="text-xs text-slate-500 font-medium mb-1 uppercase tracking-wider">Return</div>
                      <div className="font-semibold text-green-600">+19.2%</div>
                    </div>
                  </div>

                  <Separator className="mb-6" />

                  <p className="text-slate-600 text-sm leading-relaxed mb-8 flex-grow">
                    This report analyzes SharkNinja's consumer brand portfolio, product innovation, growth opportunities, and long-term investment potential.
                  </p>

                  <Button asChild className="w-full mt-auto bg-slate-900 hover:bg-primary text-white transition-colors">
                    <a href="https://drive.google.com/file/d/16iV7oCD4Pna_jJ9h5uh6e9Tru9p9Daob/view?usp=sharing" target="_blank" rel="noopener noreferrer">
                      Read Full Report <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </CardContent>
              </Card>

              <Card className="flex flex-col h-full border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300 reveal-on-scroll opacity-0 translate-y-8 ease-out delay-900 group">
                <CardHeader className="border-b border-slate-100 bg-slate-50/50 pb-6">
                  <div className="flex justify-between items-start mb-4">
                    <Badge variant="outline" className="bg-white text-xs font-semibold px-2 py-1 tracking-wider uppercase text-slate-500 border-slate-200">
                      Research Report
                    </Badge>
                    <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center text-xs font-bold ring-1 ring-emerald-100">
                      B
                    </div>
                  </div>
                  <CardTitle className="text-xl leading-tight mb-2 group-hover:text-primary transition-colors">
                    Boot Barn Holdings, Inc. (BOOT)
                  </CardTitle>
                  <CardDescription className="text-sm">
                    Western Wear & Specialty Retail
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6 flex-grow flex flex-col">
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div>
                      <div className="text-xs text-slate-500 font-medium mb-1 uppercase tracking-wider">Rating</div>
                      <div className="font-semibold text-green-600">BUY</div>
                    </div>
                    <div>
                      <div className="text-xs text-slate-500 font-medium mb-1 uppercase tracking-wider">Target</div>
                      <div className="font-semibold text-slate-900">$130.00</div>
                    </div>
                    <div>
                      <div className="text-xs text-slate-500 font-medium mb-1 uppercase tracking-wider">Return</div>
                      <div className="font-semibold text-green-600">+23.0%</div>
                    </div>
                  </div>

                  <Separator className="mb-6" />

                  <p className="text-slate-600 text-sm leading-relaxed mb-8 flex-grow">
                    This report analyzes Boot Barn's western lifestyle brand, store growth opportunities, financial performance, and long-term investment potential.
                  </p>

                  <Button asChild className="w-full mt-auto bg-slate-900 hover:bg-primary text-white transition-colors">
                    <a href="https://drive.google.com/file/d/1bmnpkNCAK9wjJCXAL1_H0qmkBp5bKLvh/view?usp=sharing" target="_blank" rel="noopener noreferrer">
                      Read Full Report <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </CardContent>
              </Card>

              <Card className="flex flex-col h-full border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300 reveal-on-scroll opacity-0 translate-y-8 ease-out delay-1000 group">
                <CardHeader className="border-b border-slate-100 bg-slate-50/50 pb-6">
                  <div className="flex justify-between items-start mb-4">
                    <Badge variant="outline" className="bg-white text-xs font-semibold px-2 py-1 tracking-wider uppercase text-slate-500 border-slate-200">
                      Research Report
                    </Badge>
                    <div className="w-8 h-8 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center text-xs font-bold ring-1 ring-amber-100">
                      W
                    </div>
                  </div>
                  <CardTitle className="text-xl leading-tight mb-2 group-hover:text-primary transition-colors">
                    Wingstop Inc. (WING)
                  </CardTitle>
                  <CardDescription className="text-sm">
                    Restaurants & Consumer Services
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6 flex-grow flex flex-col">
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div>
                      <div className="text-xs text-slate-500 font-medium mb-1 uppercase tracking-wider">Rating</div>
                      <div className="font-semibold text-amber-600">HOLD / SELL</div>
                    </div>
                    <div>
                      <div className="text-xs text-slate-500 font-medium mb-1 uppercase tracking-wider">Target</div>
                      <div className="font-semibold text-slate-900">$290.00</div>
                    </div>
                    <div>
                      <div className="text-xs text-slate-500 font-medium mb-1 uppercase tracking-wider">Return</div>
                      <div className="font-semibold text-green-600">+1.8%</div>
                    </div>
                  </div>

                  <Separator className="mb-6" />

                  <p className="text-slate-600 text-sm leading-relaxed mb-8 flex-grow">
                    This report evaluates Wingstop's franchise-led growth model, brand strength, unit expansion opportunities, and valuation outlook.
                  </p>

                  <Button asChild className="w-full mt-auto bg-slate-900 hover:bg-primary text-white transition-colors">
                    <a href="https://drive.google.com/file/d/16T21GzMi3Y3Rgvp1u517oze3V65aXQEZ/view?usp=sharing" target="_blank" rel="noopener noreferrer">
                      Read Full Report <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </CardContent>
              </Card>

              <Card className="flex flex-col h-full border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300 reveal-on-scroll opacity-0 translate-y-8 ease-out delay-[1100ms] group">
                <CardHeader className="border-b border-slate-100 bg-slate-50/50 pb-6">
                  <div className="flex justify-between items-start mb-4">
                    <Badge variant="outline" className="bg-white text-xs font-semibold px-2 py-1 tracking-wider uppercase text-slate-500 border-slate-200">
                      Research Report
                    </Badge>
                    <div className="w-8 h-8 rounded-full bg-lime-50 text-lime-600 flex items-center justify-center text-xs font-bold ring-1 ring-lime-100">
                      C
                    </div>
                  </div>
                  <CardTitle className="text-xl leading-tight mb-2 group-hover:text-primary transition-colors">
                    CAVA Group, Inc. (CAVA)
                  </CardTitle>
                  <CardDescription className="text-sm">
                    Restaurants & Consumer Dining
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6 flex-grow flex flex-col">
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div>
                      <div className="text-xs text-slate-500 font-medium mb-1 uppercase tracking-wider">Rating</div>
                      <div className="font-semibold text-slate-900">HOLD</div>
                    </div>
                    <div>
                      <div className="text-xs text-slate-500 font-medium mb-1 uppercase tracking-wider">Target</div>
                      <div className="font-semibold text-slate-900">$65.00</div>
                    </div>
                    <div>
                      <div className="text-xs text-slate-500 font-medium mb-1 uppercase tracking-wider">Return</div>
                      <div className="font-semibold text-green-600">+25.0%</div>
                    </div>
                  </div>

                  <Separator className="mb-6" />

                  <p className="text-slate-600 text-sm leading-relaxed mb-8 flex-grow">
                    This report evaluates CAVA's restaurant growth strategy, brand momentum, unit economics, and long-term investment outlook.
                  </p>

                  <Button asChild className="w-full mt-auto bg-slate-900 hover:bg-primary text-white transition-colors">
                    <a href="https://drive.google.com/file/d/1v-rXLB7Em8CkoOIXl8bU3CZC61oqImBS/view?usp=sharing" target="_blank" rel="noopener noreferrer">
                      Read Full Report <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </CardContent>
              </Card>

              <Card className="flex flex-col h-full border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300 reveal-on-scroll opacity-0 translate-y-8 ease-out delay-[1200ms] group">
                <CardHeader className="border-b border-slate-100 bg-slate-50/50 pb-6">
                  <div className="flex justify-between items-start mb-4">
                    <Badge variant="outline" className="bg-white text-xs font-semibold px-2 py-1 tracking-wider uppercase text-slate-500 border-slate-200">
                      Research Report
                    </Badge>
                    <div className="w-8 h-8 rounded-full bg-sky-50 text-sky-600 flex items-center justify-center text-xs font-bold ring-1 ring-sky-100">
                      P
                    </div>
                  </div>
                  <CardTitle className="text-xl leading-tight mb-2 group-hover:text-primary transition-colors">
                    Pool Corporation (POOL)
                  </CardTitle>
                  <CardDescription className="text-sm">
                    Pool Supplies & Outdoor Living
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6 flex-grow flex flex-col">
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div>
                      <div className="text-xs text-slate-500 font-medium mb-1 uppercase tracking-wider">Rating</div>
                      <div className="font-semibold text-slate-900">HOLD</div>
                    </div>
                    <div>
                      <div className="text-xs text-slate-500 font-medium mb-1 uppercase tracking-wider">Target</div>
                      <div className="font-semibold text-slate-900">$190.00</div>
                    </div>
                    <div>
                      <div className="text-xs text-slate-500 font-medium mb-1 uppercase tracking-wider">Return</div>
                      <div className="font-semibold text-green-600">+13.1%</div>
                    </div>
                  </div>

                  <Separator className="mb-6" />

                  <p className="text-slate-600 text-sm leading-relaxed mb-8 flex-grow">
                    This report evaluates Pool Corporation's distribution network, industry position, financial performance, and long-term investment outlook.
                  </p>

                  <Button asChild className="w-full mt-auto bg-slate-900 hover:bg-primary text-white transition-colors">
                    <a href="https://drive.google.com/file/d/13xHO5JAjGGgbNCAqj6OdyZxwndbGdrA6/view?usp=sharing" target="_blank" rel="noopener noreferrer">
                      Read Full Report <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </CardContent>
              </Card>

              <Card className="flex flex-col h-full border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300 reveal-on-scroll opacity-0 translate-y-8 ease-out delay-[1300ms] group">
                <CardHeader className="border-b border-slate-100 bg-slate-50/50 pb-6">
                  <div className="flex justify-between items-start mb-4">
                    <Badge variant="outline" className="bg-white text-xs font-semibold px-2 py-1 tracking-wider uppercase text-slate-500 border-slate-200">
                      Research Report
                    </Badge>
                    <div className="w-8 h-8 rounded-full bg-yellow-50 text-yellow-600 flex items-center justify-center text-xs font-bold ring-1 ring-yellow-100">
                      C
                    </div>
                  </div>
                  <CardTitle className="text-xl leading-tight mb-2 group-hover:text-primary transition-colors">
                    Celsius Holdings, Inc. (CELH)
                  </CardTitle>
                  <CardDescription className="text-sm">
                    Beverages & Consumer Products
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6 flex-grow flex flex-col">
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div>
                      <div className="text-xs text-slate-500 font-medium mb-1 uppercase tracking-wider">Rating</div>
                      <div className="font-semibold text-slate-900">HOLD</div>
                    </div>
                    <div>
                      <div className="text-xs text-slate-500 font-medium mb-1 uppercase tracking-wider">Target</div>
                      <div className="font-semibold text-slate-900">$35.00</div>
                    </div>
                    <div>
                      <div className="text-xs text-slate-500 font-medium mb-1 uppercase tracking-wider">Return</div>
                      <div className="font-semibold text-green-600">+13.0%</div>
                    </div>
                  </div>

                  <Separator className="mb-6" />

                  <p className="text-slate-600 text-sm leading-relaxed mb-8 flex-grow">
                    This report evaluates Celsius Holdings' beverage portfolio, brand momentum, distribution strategy, and long-term investment outlook.
                  </p>

                  <Button asChild className="w-full mt-auto bg-slate-900 hover:bg-primary text-white transition-colors">
                    <a href="https://drive.google.com/file/d/1w_Fy4U0HA6adymuNsbA2CQVbKulnZ1Y6/view?usp=sharing" target="_blank" rel="noopener noreferrer">
                      Read Full Report <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </CardContent>
              </Card>

              <Card className="flex flex-col h-full border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300 reveal-on-scroll opacity-0 translate-y-8 ease-out delay-[1400ms] group">
                <CardHeader className="border-b border-slate-100 bg-slate-50/50 pb-6">
                  <div className="flex justify-between items-start mb-4">
                    <Badge variant="outline" className="bg-white text-xs font-semibold px-2 py-1 tracking-wider uppercase text-slate-500 border-slate-200">
                      Research Report
                    </Badge>
                    <div className="w-8 h-8 rounded-full bg-brown-50 text-brown-600 flex items-center justify-center text-xs font-bold ring-1 ring-brown-100">
                      D
                    </div>
                  </div>
                  <CardTitle className="text-xl leading-tight mb-2 group-hover:text-primary transition-colors">
                    Dutch Bros Inc. (BROS)
                  </CardTitle>
                  <CardDescription className="text-sm">
                    Coffee & Beverage Retail
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6 flex-grow flex flex-col">
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div>
                      <div className="text-xs text-slate-500 font-medium mb-1 uppercase tracking-wider">Rating</div>
                      <div className="font-semibold text-slate-900">HOLD</div>
                    </div>
                    <div>
                      <div className="text-xs text-slate-500 font-medium mb-1 uppercase tracking-wider">Target</div>
                      <div className="font-semibold text-slate-900">$45.00</div>
                    </div>
                    <div>
                      <div className="text-xs text-slate-500 font-medium mb-1 uppercase tracking-wider">Return</div>
                      <div className="font-semibold text-green-600">+12.5%</div>
                    </div>
                  </div>

                  <Separator className="mb-6" />

                  <p className="text-slate-600 text-sm leading-relaxed mb-8 flex-grow">
                    This report evaluates Dutch Bros' store growth strategy, brand momentum, unit economics, and long-term investment outlook.
                  </p>

                  <Button asChild className="w-full mt-auto bg-slate-900 hover:bg-primary text-white transition-colors">
                    <a href="https://drive.google.com/file/d/1ykRomPrRsvzBRsz9NTPjFeT0D7Z8l-n1/view?usp=sharing" target="_blank" rel="noopener noreferrer">
                      Read Full Report <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </CardContent>
              </Card>

              <Card className="flex flex-col h-full border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300 reveal-on-scroll opacity-0 translate-y-8 ease-out delay-[1500ms] group">
                <CardHeader className="border-b border-slate-100 bg-slate-50/50 pb-6">
                  <div className="flex justify-between items-start mb-4">
                    <Badge variant="outline" className="bg-white text-xs font-semibold px-2 py-1 tracking-wider uppercase text-slate-500 border-slate-200">
                      Research Report
                    </Badge>
                    <div className="w-8 h-8 rounded-full bg-red-50 text-red-600 flex items-center justify-center text-xs font-bold ring-1 ring-red-100">
                      T
                    </div>
                  </div>
                  <CardTitle className="text-xl leading-tight mb-2 group-hover:text-primary transition-colors">
                    Texas Roadhouse, Inc. (TXRH)
                  </CardTitle>
                  <CardDescription className="text-sm">
                    Restaurants & Dining
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6 flex-grow flex flex-col">
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div>
                      <div className="text-xs text-slate-500 font-medium mb-1 uppercase tracking-wider">Rating</div>
                      <div className="font-semibold text-slate-900">HOLD</div>
                    </div>
                    <div>
                      <div className="text-xs text-slate-500 font-medium mb-1 uppercase tracking-wider">Target</div>
                      <div className="font-semibold text-slate-900">$180.00</div>
                    </div>
                    <div>
                      <div className="text-xs text-slate-500 font-medium mb-1 uppercase tracking-wider">Return</div>
                      <div className="font-semibold text-green-600">+5.9%</div>
                    </div>
                  </div>

                  <Separator className="mb-6" />

                  <p className="text-slate-600 text-sm leading-relaxed mb-8 flex-grow">
                    This report evaluates Texas Roadhouse's restaurant model, brand strength, unit growth opportunities, and long-term investment outlook.
                  </p>

                  <Button asChild className="w-full mt-auto bg-slate-900 hover:bg-primary text-white transition-colors">
                    <a href="https://drive.google.com/file/d/1w3b2dMJvLHwct2-p1Zd4MbEsC6zpIYCr/view?usp=sharing" target="_blank" rel="noopener noreferrer">
                      Read Full Report <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </CardContent>
              </Card>

              <Card className="flex flex-col h-full border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300 reveal-on-scroll opacity-0 translate-y-8 ease-out delay-[1600ms] group">
                <CardHeader className="border-b border-slate-100 bg-slate-50/50 pb-6">
                  <div className="flex justify-between items-start mb-4">
                    <Badge variant="outline" className="bg-white text-xs font-semibold px-2 py-1 tracking-wider uppercase text-slate-500 border-slate-200">
                      Research Report
                    </Badge>
                    <div className="w-8 h-8 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center text-xs font-bold ring-1 ring-amber-100">
                      L
                    </div>
                  </div>
                  <CardTitle className="text-xl leading-tight mb-2 group-hover:text-primary transition-colors">
                    Lululemon Athletica Inc. (LULU)
                  </CardTitle>
                  <CardDescription className="text-sm">
                    Athletic Apparel & Consumer Retail
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6 flex-grow flex flex-col">
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div>
                      <div className="text-xs text-slate-500 font-medium mb-1 uppercase tracking-wider">Rating</div>
                      <div className="font-semibold text-amber-600">SELL / HOLD</div>
                    </div>
                    <div>
                      <div className="text-xs text-slate-500 font-medium mb-1 uppercase tracking-wider">Target</div>
                      <div className="font-semibold text-slate-900">$305.00</div>
                    </div>
                    <div>
                      <div className="text-xs text-slate-500 font-medium mb-1 uppercase tracking-wider">Return</div>
                      <div className="font-semibold text-green-600">+1.7%</div>
                    </div>
                  </div>

                  <Separator className="mb-6" />

                  <p className="text-slate-600 text-sm leading-relaxed mb-8 flex-grow">
                    This report evaluates lululemon's brand strength, product innovation, international growth opportunities, and valuation outlook.
                  </p>

                  <Button asChild className="w-full mt-auto bg-slate-900 hover:bg-primary text-white transition-colors">
                    <a href="https://drive.google.com/file/d/1UXSOqgJUCuggDtr-LEzygCaP6IzxTFMy/view?usp=sharing" target="_blank" rel="noopener noreferrer">
                      Read Full Report <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </CardContent>
              </Card>

              <Card className="flex flex-col h-full border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300 reveal-on-scroll opacity-0 translate-y-8 ease-out delay-[1700ms] group">
                <CardHeader className="border-b border-slate-100 bg-slate-50/50 pb-6">
                  <div className="flex justify-between items-start mb-4">
                    <Badge variant="outline" className="bg-white text-xs font-semibold px-2 py-1 tracking-wider uppercase text-slate-500 border-slate-200">
                      Research Report
                    </Badge>
                    <div className="w-8 h-8 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center text-xs font-bold ring-1 ring-amber-100">
                      W
                    </div>
                  </div>
                  <CardTitle className="text-xl leading-tight mb-2 group-hover:text-primary transition-colors">
                    Williams-Sonoma, Inc. (WSM)
                  </CardTitle>
                  <CardDescription className="text-sm">
                    Home Furnishings & Specialty Retail
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6 flex-grow flex flex-col">
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div>
                      <div className="text-xs text-slate-500 font-medium mb-1 uppercase tracking-wider">Rating</div>
                      <div className="font-semibold text-amber-600">HOLD / SELL</div>
                    </div>
                    <div>
                      <div className="text-xs text-slate-500 font-medium mb-1 uppercase tracking-wider">Target</div>
                      <div className="font-semibold text-slate-900">$230.00</div>
                    </div>
                    <div>
                      <div className="text-xs text-slate-500 font-medium mb-1 uppercase tracking-wider">Return</div>
                      <div className="font-semibold text-green-600">+2.6%</div>
                    </div>
                  </div>

                  <Separator className="mb-6" />

                  <p className="text-slate-600 text-sm leading-relaxed mb-8 flex-grow">
                    This report evaluates Williams-Sonoma's portfolio of home brands, direct-to-consumer model, financial performance, and long-term investment outlook.
                  </p>

                  <Button asChild className="w-full mt-auto bg-slate-900 hover:bg-primary text-white transition-colors">
                    <a href="https://drive.google.com/file/d/1hAhuUxhySjy7elULBJfgiPb6tZH6cgIF/view?usp=sharing" target="_blank" rel="noopener noreferrer">
                      Read Full Report <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </CardContent>
              </Card>

              <Card className="flex flex-col h-full border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300 reveal-on-scroll opacity-0 translate-y-8 ease-out delay-[1800ms] group">
                <CardHeader className="border-b border-slate-100 bg-slate-50/50 pb-6">
                  <div className="flex justify-between items-start mb-4">
                    <Badge variant="outline" className="bg-white text-xs font-semibold px-2 py-1 tracking-wider uppercase text-slate-500 border-slate-200">
                      Research Report
                    </Badge>
                    <div className="w-8 h-8 rounded-full bg-red-50 text-red-600 flex items-center justify-center text-xs font-bold ring-1 ring-red-100">
                      A
                    </div>
                  </div>
                  <CardTitle className="text-xl leading-tight mb-2 group-hover:text-primary transition-colors">
                    Adobe Inc. (ADBE)
                  </CardTitle>
                  <CardDescription className="text-sm">
                    Software & Creative Tools
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6 flex-grow flex flex-col">
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div>
                      <div className="text-xs text-slate-500 font-medium mb-1 uppercase tracking-wider">Rating</div>
                      <div className="font-semibold text-amber-600">HOLD / SELL</div>
                    </div>
                    <div>
                      <div className="text-xs text-slate-500 font-medium mb-1 uppercase tracking-wider">Target</div>
                      <div className="font-semibold text-slate-900">$255.00</div>
                    </div>
                    <div>
                      <div className="text-xs text-slate-500 font-medium mb-1 uppercase tracking-wider">Return</div>
                      <div className="font-semibold text-green-600">+2.5%</div>
                    </div>
                  </div>

                  <Separator className="mb-6" />

                  <p className="text-slate-600 text-sm leading-relaxed mb-8 flex-grow">
                    This report evaluates Adobe's creative software ecosystem, recurring revenue model, competitive position, and long-term investment outlook.
                  </p>

                  <Button asChild className="w-full mt-auto bg-slate-900 hover:bg-primary text-white transition-colors">
                    <a href="https://drive.google.com/file/d/18TUy3nmG_o2hHfVC84CboCFVi1RVTnno/view?usp=sharing" target="_blank" rel="noopener noreferrer">
                      Read Full Report <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </CardContent>
              </Card>

              <Card className="flex flex-col h-full border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300 reveal-on-scroll opacity-0 translate-y-8 ease-out delay-[1900ms] group">
                <CardHeader className="border-b border-slate-100 bg-slate-50/50 pb-6">
                  <div className="flex justify-between items-start mb-4">
                    <Badge variant="outline" className="bg-white text-xs font-semibold px-2 py-1 tracking-wider uppercase text-slate-500 border-slate-200">
                      Research Report
                    </Badge>
                    <div className="w-8 h-8 rounded-full bg-green-50 text-green-600 flex items-center justify-center text-xs font-bold ring-1 ring-green-100">
                      S
                    </div>
                  </div>
                  <CardTitle className="text-xl leading-tight mb-2 group-hover:text-primary transition-colors">
                    Spotify Technology S.A. (SPOT)
                  </CardTitle>
                  <CardDescription className="text-sm">
                    Music Streaming & Digital Media
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6 flex-grow flex flex-col">
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div>
                      <div className="text-xs text-slate-500 font-medium mb-1 uppercase tracking-wider">Rating</div>
                      <div className="font-semibold text-slate-900">HOLD</div>
                    </div>
                    <div>
                      <div className="text-xs text-slate-500 font-medium mb-1 uppercase tracking-wider">Target</div>
                      <div className="font-semibold text-slate-900">$520.00</div>
                    </div>
                    <div>
                      <div className="text-xs text-slate-500 font-medium mb-1 uppercase tracking-wider">Return</div>
                      <div className="font-semibold text-green-600">+2.0%</div>
                    </div>
                  </div>

                  <Separator className="mb-6" />

                  <p className="text-slate-600 text-sm leading-relaxed mb-8 flex-grow">
                    This report evaluates Spotify's streaming platform, subscriber growth, monetization strategy, competitive position, and long-term investment outlook.
                  </p>

                  <Button asChild className="w-full mt-auto bg-slate-900 hover:bg-primary text-white transition-colors">
                    <a href="https://drive.google.com/file/d/1YDIum4ECVtu0OzQtVKUwQklEQyYBqorh/view?usp=sharing" target="_blank" rel="noopener noreferrer">
                      Read Full Report <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </CardContent>
              </Card>

              <Card className="flex flex-col h-full border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300 reveal-on-scroll opacity-0 translate-y-8 ease-out delay-[2000ms] group">
                <CardHeader className="border-b border-slate-100 bg-slate-50/50 pb-6">
                  <div className="flex justify-between items-start mb-4">
                    <Badge variant="outline" className="bg-white text-xs font-semibold px-2 py-1 tracking-wider uppercase text-slate-500 border-slate-200">
                      Research Report
                    </Badge>
                    <div className="w-8 h-8 rounded-full bg-orange-50 text-orange-600 flex items-center justify-center text-xs font-bold ring-1 ring-orange-100">
                      D
                    </div>
                  </div>
                  <CardTitle className="text-xl leading-tight mb-2 group-hover:text-primary transition-colors">
                    DoorDash, Inc. (DASH)
                  </CardTitle>
                  <CardDescription className="text-sm">
                    Food Delivery & Local Commerce
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6 flex-grow flex flex-col">
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div>
                      <div className="text-xs text-slate-500 font-medium mb-1 uppercase tracking-wider">Rating</div>
                      <div className="font-semibold text-amber-600">HOLD</div>
                    </div>
                    <div>
                      <div className="text-xs text-slate-500 font-medium mb-1 uppercase tracking-wider">Target</div>
                      <div className="font-semibold text-slate-900">$200.00</div>
                    </div>
                    <div>
                      <div className="text-xs text-slate-500 font-medium mb-1 uppercase tracking-wider">Return</div>
                      <div className="font-semibold text-green-600">+3.6%</div>
                    </div>
                  </div>

                  <Separator className="mb-6" />

                  <p className="text-slate-600 text-sm leading-relaxed mb-8 flex-grow">
                    This report evaluates DoorDash's marketplace platform, delivery network, growth opportunities, competitive position, and long-term investment outlook.
                  </p>

                  <Button asChild className="w-full mt-auto bg-slate-900 hover:bg-primary text-white transition-colors">
                    <a href="https://drive.google.com/file/d/11JmPImtR1GP941ucrK0rayCRC9MO1rQN/view?usp=sharing" target="_blank" rel="noopener noreferrer">
                      Read Full Report <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </CardContent>
              </Card>

              <Card className="flex flex-col h-full border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300 reveal-on-scroll opacity-0 translate-y-8 ease-out delay-[2100ms] group">
                <CardHeader className="border-b border-slate-100 bg-slate-50/50 pb-6">
                  <div className="flex justify-between items-start mb-4">
                    <Badge variant="outline" className="bg-white text-xs font-semibold px-2 py-1 tracking-wider uppercase text-slate-500 border-slate-200">
                      Research Report
                    </Badge>
                    <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center text-xs font-bold ring-1 ring-blue-100">
                      P
                    </div>
                  </div>
                  <CardTitle className="text-xl leading-tight mb-2 group-hover:text-primary transition-colors">
                    Palantir Technologies Inc. (PLTR)
                  </CardTitle>
                  <CardDescription className="text-sm">
                    AI Software & Data Analytics
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6 flex-grow flex flex-col">
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div>
                      <div className="text-xs text-slate-500 font-medium mb-1 uppercase tracking-wider">Rating</div>
                      <div className="font-semibold text-amber-600">HOLD</div>
                    </div>
                    <div>
                      <div className="text-xs text-slate-500 font-medium mb-1 uppercase tracking-wider">Target</div>
                      <div className="font-semibold text-slate-900">$190.00</div>
                    </div>
                    <div>
                      <div className="text-xs text-slate-500 font-medium mb-1 uppercase tracking-wider">Return</div>
                      <div className="font-semibold text-green-600">+6.7%</div>
                    </div>
                  </div>

                  <Separator className="mb-6" />

                  <p className="text-slate-600 text-sm leading-relaxed mb-8 flex-grow">
                    This report evaluates Palantir's artificial intelligence platforms, government and commercial businesses, growth trajectory, competitive position, and long-term investment outlook.
                  </p>

                  <Button asChild className="w-full mt-auto bg-slate-900 hover:bg-primary text-white transition-colors">
                    <a href="https://drive.google.com/file/d/1wU_0OTXVBsJ93tSVfit4IEurMvs5y6Mf/view?usp=sharing" target="_blank" rel="noopener noreferrer">
                      Read Full Report <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

function PhilosophyPage() {
  useScrollReveal();

  const principles = [
    {
      title: "Focus on Quality Moats",
      icon: <ShieldCheck className="w-5 h-5 text-primary" />,
      desc: "I seek businesses protected by strong structural barriers to entry, such as high switching costs, network effects, brand equity, or cost advantages."
    },
    {
      title: "Financial Resilience",
      icon: <Briefcase className="w-5 h-5 text-primary" />,
      desc: "I prioritize companies with healthy balance sheets, robust free cash flow generation, and high returns on invested capital."
    },
    {
      title: "Long-Term Orientation",
      icon: <LineChart className="w-5 h-5 text-primary" />,
      desc: "Markets are often driven by short-term noise, quarterly earnings pressure, and macro sentiment. I aim to capitalize on opportunities where a company's long-term compounding potential is undervalued."
    },
    {
      title: "Margin of Safety",
      icon: <Scale className="w-5 h-5 text-primary" />,
      desc: "Valuation matters. A disciplined investment process requires buying at a price that offers asymmetric upside while protecting against permanent capital loss."
    }
  ];

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 selection:bg-primary selection:text-white">
      <Navigation />
      <main>
        <section className="pt-32 pb-24 bg-slate-900 text-white relative overflow-hidden min-h-screen">
          <div className="absolute top-0 right-0 -mr-40 -mt-40 w-96 h-96 bg-primary/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 -ml-40 -mb-40 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>

          <div className="container mx-auto px-6 max-w-5xl relative z-10">
            <div className="max-w-2xl mb-16 reveal-on-scroll opacity-0 translate-y-8 transition-all duration-700 ease-out">
              <h2 className="text-3xl font-bold tracking-tight mb-4 text-white">Investment Philosophy</h2>
              <div className="w-12 h-1 bg-primary rounded-full mb-6"></div>
              <p className="text-lg text-slate-300 font-light leading-relaxed">
                My approach to investing is grounded in fundamental, bottom-up analysis with a long-term ownership mindset. Rather than viewing stocks as tickers on a screen to be traded for short-term gains, I view them as fractional ownership stakes in real businesses.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-x-12 gap-y-10">
              {principles.map((p, i) => (
                <div
                  key={i}
                  className="flex gap-4 reveal-on-scroll opacity-0 translate-y-8 transition-all duration-700 ease-out"
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  <div className="flex-shrink-0 mt-1 w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center">
                    {p.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">{p.title}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <footer className="bg-slate-950 py-8 border-t border-slate-800">
        <div className="container mx-auto px-6 max-w-5xl flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-slate-400 text-sm">
            &copy; {new Date().getFullYear()} Shikhar Haldia. All rights reserved.
          </div>
          <div className="text-slate-500 text-xs text-center md:text-right max-w-xs">
            The research provided on this website is for informational purposes only and does not constitute investment advice.
          </div>
        </div>
      </footer>
    </div>
  );
}

function App() {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/about" component={AboutPage} />
      <Route path="/research" component={ResearchPage} />
      <Route path="/philosophy" component={PhilosophyPage} />
      <Route component={HomePage} />
    </Switch>
  );
}

export default App;
