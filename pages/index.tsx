import { request, responsiveImageHelper, responsiveImageFragment, getGlobalData } from '@/lib/datocms'
export { default,  } from '@/www/pages/index'

const query = `
query InicioQuery {
  inicio {
    heroSvg
    introTitulo
    introDescripcion
    introImage {
      ${responsiveImageHelper({ w: 800, h: 800, fit: 'crop' })}
    }
  }
  allCamaras {
    nombre
    slug
    bgColor {
      hex
    }
    fgColor {
      hex
    }
    imagen {
      ${responsiveImageHelper({ w: 545, h: 812, fit: 'crop' })}
    }
    modulos {
      titulo
      icon
      texto
    }
  }
  allIntegrantes {
    nombre
    cargo
    imagenSm {
      ${responsiveImageHelper({ w: 545, h: 812, fit: 'crop' })}
    }
    imagenLg {
      ${responsiveImageHelper({ w: 640, h: 812, fit: 'crop' })}
    }
    ocupaciones {
      ocupacion
    }
  }
  allAlbums(first: 3) {
    titulo
    slug
    imagenes {
      ${responsiveImageHelper({ w: 256, h: 256, fit: 'crop' })}
    }
  }
  allLineaEstrategicas {
    titulo
    slug
    icon
    imagen {
      ${responsiveImageHelper({ w: 800, h: 480, fit: 'crop' })}
    }
    descripcion {
      bullet
    }
  }
  allNoticiaEntradas(first: 3) {
    updatedAt
    titulo
    slug
    descripcion
    thumbnail {
      ${responsiveImageHelper({ w: 800, h: 480, fit: 'crop' })}
    }
  }
}

${responsiveImageFragment}
`

export const getStaticProps = async () => {
  const {
    inicio,
    allCamaras,
    allIntegrantes,
    allLineaEstrategicas,
    allAlbums,
    allNoticiaEntradas,
  } = await request({ query })
  const globalData = await getGlobalData()
  return {
    props: {
      ...inicio,
      camaras: allCamaras,
      equipo: allIntegrantes,
      lineasEstrategicas: allLineaEstrategicas,
      albums: allAlbums,
      noticias: allNoticiaEntradas,
      globalData,
    }
  }
}
