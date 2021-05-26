export interface LegalInformation {
    id: number,
    title: string,
    introduction?: string[],
    sections?: Array<Section>  
}

export interface Section {
    title: string,
    description?: string,
}
