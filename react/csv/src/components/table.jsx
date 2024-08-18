import { observer } from 'mobx-react-lite'

const PAGE_SIZE = 100
const IMAGE_EXTENSIONS = [
  'ase', 'art', 'bmp', 'blp', 'cd5', 'cit', 'cpt', 'cr2', 'cut', 'dds', 'dib', 'djvu', 'egt', 'exif',
  'gif', 'gpl', 'grf', 'icns', 'ico', 'iff', 'jng', 'jpeg', 'jpg', 'jfif', 'jp2', 'jps', 'lbm', 'max',
  'miff', 'mng', 'msp', 'nef', 'nitf', 'ota', 'pbm', 'pc1', 'pc2', 'pc3', 'pcf', 'pcx', 'pdn', 'pgm',
  'PI1', 'PI2', 'PI3', 'pict', 'pct', 'pnm', 'pns', 'ppm', 'psb', 'psd', 'pdd', 'psp', 'px', 'pxm',
  'pxr', 'qfx', 'raw', 'rle', 'sct', 'sgi', 'rgb', 'int', 'bw', 'tga', 'tiff', 'tif', 'vtf', 'xbm',
  'xcf', 'xpm', '3dv', 'amf', 'ai', 'awg', 'cgm', 'cdr', 'cmx', 'dxf', 'e2d', 'egt', 'eps', 'fs',
  'gbr', 'odg', 'svg', 'stl', 'vrml', 'x3d', 'sxd', 'v2d', 'vnd', 'wmf', 'emf', 'art', 'xar', 'png',
  'webp', 'jxr', 'hdp', 'wdp', 'cur', 'ecw', 'iff', 'lbm', 'liff', 'nrrd', 'pam', 'pcx', 'pgf',
  'sgi', 'rgb', 'rgba', 'bw', 'int', 'inta', 'sid', 'ras', 'sun', 'tga', 'heic', 'heif'
]

function getURLExtension(url) {
  return url.split(/[#?]/)[0].split('.').pop().trim()
}

function createCellContent(cellValue) {
  const trimmedValue = cellValue.trim()

  if (URL.parse(trimmedValue)) {
    const extension = getURLExtension(trimmedValue)

    if (IMAGE_EXTENSIONS.includes(extension)) {
      return <a href={ trimmedValue }><img src={ trimmedValue } /></a>
    }

    return <a href={ trimmedValue }>{ cellValue }</a>
  }

  return cellValue
}

function Table({ state, page }) {
  const changeRowSelection = event => {
    const rowIndex = parseInt(event.target.value, 10)

    if (event.target.checked) {
      state.selectRow(rowIndex)
    } else {
      state.unselectRow(rowIndex)
    }
  }

  return (
    <table id="data_table">
      <thead>
        <tr>
          <th className="data-table-header-cell first-column" />

          {state.csvContent.meta.fields.map(columnName => <th className="data-table-header-cell" key={ `column_name_${columnName}` }>{ columnName }</th>)}

        </tr>
      </thead>
      <tbody>
        {
          state.csvContent.data.slice(page * PAGE_SIZE, PAGE_SIZE * (page + 1)).map((field, index) => {
            const rowIndex = index + page * PAGE_SIZE

            return (
              <tr key={ `row_${index}` }>
                <td className="data-table-cell first-column">
                  <div className="row-selector">
                    <span>{ index + 1 }</span>
                    <input type="checkbox" value={ rowIndex } onChange={ changeRowSelection } checked={ state.selectedRows.has(rowIndex) } />
                  </div>
                </td>

                {
                  state.csvContent.meta.fields.map(columnName => (
                    <td className="data-table-cell" key={ `column_cell_${columnName}_${index}` }>
                      { createCellContent(field[columnName]) }
                    </td>
                  ))
                }

              </tr>
            )
          })
        }

      </tbody>
    </table>
  )
}

export default observer(Table)
