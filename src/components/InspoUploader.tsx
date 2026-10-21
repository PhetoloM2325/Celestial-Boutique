import { useEffect, useRef, useState, type DragEvent, type ChangeEvent } from 'react'
import { ArrowRight, Check, ImagePlus, LoaderCircle, RotateCcw, Sparkles } from 'lucide-react'

export default function InspoUploader() {
  const inputRef = useRef<HTMLInputElement>(null)
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState('')
  const [analyzing, setAnalyzing] = useState(false)
  const [analyzed, setAnalyzed] = useState(false)
  const [dragging, setDragging] = useState(false)
  const [uploadError, setUploadError] = useState('')

  useEffect(() => {
    if (!file) {
      setPreview('')
      return
    }
    const objectUrl = URL.createObjectURL(file)
    setPreview(objectUrl)
    return () => URL.revokeObjectURL(objectUrl)
  }, [file])

  const acceptFile = (nextFile?: File) => {
    if (!nextFile) return
    if (!nextFile.type.startsWith('image/')) {
      setUploadError('Choose an image file to create your inspiration preview.')
      return
    }
    setFile(nextFile)
    setUploadError('')
    setAnalyzed(false)
  }
  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    acceptFile(event.target.files?.[0])
    event.target.value = ''
  }
  const onDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    setDragging(false)
    acceptFile(event.dataTransfer.files[0])
  }
  const analyze = () => {
    if (!file || analyzing) return
    setAnalyzing(true)
    window.setTimeout(() => { setAnalyzing(false); setAnalyzed(true) }, 1000)
  }

  return (
    <section className="section inspo-section" id="inspo">
      <div className="inspo-intro"><span className="eyebrow">A LITTLE VISUAL INSTINCT</span><h2>Show us what<br /><em>you’re feeling.</em></h2><p>A saved look, an old photograph, a colour you can’t stop thinking about. We’ll find the thread and bring it into your wardrobe.</p><span className="inspo-index">CELESTIAL / STYLE MATCH 01—06</span></div>
      <div className="inspo-workspace">
        <div className={dragging ? 'upload-zone is-dragging' : 'upload-zone'} onDragOver={(event) => { event.preventDefault(); setDragging(true) }} onDragLeave={() => setDragging(false)} onDrop={onDrop}>
          {preview ? <img className="inspo-preview" src={preview} alt={`Inspiration uploaded: ${file?.name ?? 'image'}`} /> : <div className="upload-prompt"><span className="upload-icon"><ImagePlus size={22} /></span><b>Drop your inspiration here</b><span>or choose an image from your device</span></div>}
          <input ref={inputRef} type="file" accept="image/*" onChange={onChange} hidden />
          <button className="upload-browse" onClick={() => inputRef.current?.click()}>{preview ? 'Choose a different image' : 'Browse images'} <ArrowRight size={14} /></button>
        </div>
        {uploadError && <p className="upload-error" role="alert">{uploadError}</p>}
        {analyzed ? <div className="analysis-result"><div className="analysis-head"><span className="eyebrow"><Check size={13} /> YOUR EDIT IS READY</span><button aria-label="Reset image" className="icon-button" onClick={() => { setFile(null); setPreview(''); setAnalyzed(false) }}><RotateCcw size={15} /></button></div><h3>Considered, not copied.</h3><p>We found a relaxed, elongated silhouette with a tonal palette and a soft, fluid finish.</p><div className="analysis-tags"><span>RELAXED TAILORING</span><span>WARM NEUTRALS</span><span>FLUID SILK</span></div><div className="match-line"><span><Sparkles size={15} /> The Column Dress</span><b>92% match</b></div><button className="button button-dark analysis-button" onClick={() => document.querySelector('#shop')?.scrollIntoView({ behavior: 'smooth' })}>Explore your matches <ArrowRight size={14} /></button></div> : <div className="analysis-waiting"><span className="eyebrow">YOUR PERSONAL EDIT</span>{analyzing ? <><LoaderCircle className="spin" size={23} /><h3>Finding the feeling...</h3><p>Reading shape, colour and texture.</p></> : <><span className="analysis-empty">—</span><h3>{file ? 'Ready when you are.' : 'Your eye, our edit.'}</h3><p>{file ? 'We’ll look for silhouette, palette, and fabric.' : 'Upload an image to discover pieces with a similar mood.'}</p></>}<button className="button button-quiet" disabled={!file || analyzing} onClick={analyze}>{analyzing ? 'Analysing image' : 'Find my edit'} <ArrowRight size={14} /></button></div>}
        <div className="privacy-note">Demo only: the image preview stays in your browser. No image-analysis service is connected, and images aren’t uploaded or saved.</div>
      </div>
    </section>
  )
}
