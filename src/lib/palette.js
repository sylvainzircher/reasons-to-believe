export const PALETTE = {
  theology:        { bg: '#F5EFE6', accent: '#9B6A2F', text: '#5a3d14' },
  islam:           { bg: '#E8F0E8', accent: '#2F7A4A', text: '#1a4a2a' },
  christianity:    { bg: '#EAE8F5', accent: '#5A3FA0', text: '#2e1f6b' },
  archaeology:     { bg: '#F0E8DC', accent: '#8B5E2F', text: '#4a2e10' },
  bible:           { bg: '#F5F0E8', accent: '#7A5C2F', text: '#3d2a0a' },
  history:         { bg: '#EDE8E0', accent: '#6B5040', text: '#3d2a18' },
  genetics:        { bg: '#E8F5F0', accent: '#2F7A6A', text: '#0f3d30' },
  science:         { bg: '#E8EEF5', accent: '#2F5A8B', text: '#0f2a50' },
  consciousness:   { bg: '#F0E8F5', accent: '#6A2F8B', text: '#350f50' },
  'quantum physics': { bg: '#E8F0F5', accent: '#1F5C8B', text: '#0a2640' },
  neuroscience:    { bg: '#F5E8F0', accent: '#8B2F6A', text: '#500f35' },
  philosophy:      { bg: '#F0EDE8', accent: '#6A5A2F', text: '#352a0a' },
  parapsychology:  { bg: '#F5EAF0', accent: '#7A2F5A', text: '#400f28' },
  politics:        { bg: '#E8EDE8', accent: '#3F6A3F', text: '#1a351a' },
  america:         { bg: '#E8ECF5', accent: '#2F4A8B', text: '#0a1f50' },
  religion:        { bg: '#F5EDE8', accent: '#8B4A2F', text: '#501a0a' },
  biology:         { bg: '#E8F5E8', accent: '#2F7A3F', text: '#0f3d1a' },
  creationism:     { bg: '#EDF5EA', accent: '#3A6A2A', text: '#1a350f' },
  cosmology:       { bg: '#E8E8F5', accent: '#3F3FAA', text: '#1a1a60' },
  perception:      { bg: '#F5E8EE', accent: '#8B2F5A', text: '#500f28' },
  apologetics:     { bg: '#F0EDE8', accent: '#7A6040', text: '#3d2a14' },
}

const DEFAULT = { bg: '#F0EDE8', accent: '#6B5040', text: '#3d2a18' }

export function getPalette(tags = []) {
  for (const tag of tags) {
    const key = tag.toLowerCase().trim()
    if (PALETTE[key]) return PALETTE[key]
  }
  return DEFAULT
}
