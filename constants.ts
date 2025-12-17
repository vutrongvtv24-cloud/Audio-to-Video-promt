
export const APP_TITLE = "AI Video Director & Prompt Engineer";
export const MAX_FILE_SIZE_MB = 10;
export const SUPPORTED_AUDIO_TYPES = ["audio/mp3", "audio/mpeg", "audio/wav", "audio/aac", "audio/ogg", "audio/m4a"];

export const TEXTS = {
  en: {
    appTitle: "AI Video Director & Prompt Engineer",
    role: "PROMPT ENGINEER AGENT",
    newProject: "New Project",
    heroTitlePrefix: "Turn Audio into",
    heroTitleSuffix: "Visual Masterpieces",
    heroDesc: "Upload a voiceover, podcast clip, or story narration. The AI Director will analyze the context and generate consistent prompts for Videos or Images.",
    modeVideo: "Video Mode (8s Segments)",
    modeImage: "Image Mode (Scene Based)",
    chooseStyle: "Choose Visual Style",
    dropHere: "Drop the audio here",
    uploadClick: "Click to upload or drag and drop",
    uploadLimit: (max: number) => `MP3, WAV, AAC, M4A (Max ${max}MB)`,
    analyzing: "Analyzing Content",
    analyzingDesc: "The AI Director is listening to your audio, analyzing the context, and composing precise prompts...",
    step1: "Listening",
    step2: "Contextualizing",
    step3: "Writing Prompts",
    analysisFailed: "Analysis Failed",
    tryAgain: "Try Again",
    resultTitle: "Director's Script",
    exportTxt: "Export TXT",
    downloadMd: "Download MD",
    copy: "Copy All",
    copied: "Copied!",
    footerPowered: "Powered by Gemini 2.5 Flash • Optimized for Video Generation Models",
    author: "Author",
    zalo: "Zalo"
  },
  vi: {
    appTitle: "Đạo diễn Video AI & Kỹ sư Prompt",
    role: "TRỢ LÝ KỸ SƯ PROMPT",
    newProject: "Dự án mới",
    heroTitlePrefix: "Biến âm thanh thành",
    heroTitleSuffix: "Kiệt tác Hình ảnh",
    heroDesc: "Tải lên giọng đọc, podcast hoặc câu chuyện. Đạo diễn AI sẽ phân tích ngữ cảnh và tạo ra các prompt nhất quán cho Video hoặc Ảnh minh họa.",
    modeVideo: "Chế độ Video (Cắt 8s/đoạn)",
    modeImage: "Chế độ Ảnh (Theo bối cảnh)",
    chooseStyle: "Chọn Phong cách Hình ảnh",
    dropHere: "Thả file âm thanh vào đây",
    uploadClick: "Nhấn để tải lên hoặc kéo thả",
    uploadLimit: (max: number) => `MP3, WAV, AAC, M4A (Tối đa ${max}MB)`,
    analyzing: "Đang phân tích nội dung",
    analyzingDesc: "Đạo diễn AI đang nghe âm thanh, phân tích ngữ cảnh và viết kịch bản hình ảnh chi tiết...",
    step1: "Đang nghe",
    step2: "Xử lý ngữ cảnh",
    step3: "Viết Prompt",
    analysisFailed: "Phân tích thất bại",
    tryAgain: "Thử lại",
    resultTitle: "Kịch bản Đạo diễn",
    exportTxt: "Xuất TXT",
    downloadMd: "Tải xuống MD",
    copy: "Sao chép",
    copied: "Đã chép!",
    footerPowered: "Được hỗ trợ bởi Gemini 2.5 Flash • Tối ưu hóa cho các mô hình tạo video",
    author: "Tác giả",
    zalo: "Zalo"
  }
};

export const VIDEO_STYLES = [
  { 
    id: 'cinematic', 
    name: 'Cinematic Movie',
    name_vi: 'Điện ảnh Hollywood',
    description: 'High budget, dramatic lighting, 8k, anamorphic lens',
    description_vi: 'Ngân sách cao, ánh sáng kịch tính, quay bằng lens Anamorphic',
    prompt_modifier: 'Cinematic lighting, photorealistic, 8k, shot on ARRI Alexa, color graded, dramatic atmosphere',
    image: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=600&q=80'
  },
  { 
    id: 'photorealistic', 
    name: 'Photorealistic / Doc',
    name_vi: 'Tài liệu thực tế',
    description: 'Natural lighting, sharp focus, true-to-life details',
    description_vi: 'Ánh sáng tự nhiên, sắc nét, chi tiết chân thực như phim tài liệu',
    prompt_modifier: 'Hyper-realistic, documentary style, natural lighting, 4k, high texture detail, sharp focus',
    image: 'https://images.unsplash.com/photo-1554080353-a576cf803bda?auto=format&fit=crop&w=600&q=80'
  },
  { 
    id: '3d-animation', 
    name: '3D Animation', 
    name_vi: 'Hoạt hình 3D',
    description: 'Pixar/Disney style, Unreal Engine 5 render',
    description_vi: 'Phong cách Pixar/Disney, kết xuất Unreal Engine 5 rực rỡ',
    prompt_modifier: '3D Animation style, Pixar style, Unreal Engine 5 render, vibrant colors, soft lighting, cute and expressive',
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=600&q=80'
  },
  { 
    id: 'anime', 
    name: 'Anime / Japanese 2D', 
    name_vi: 'Anime Nhật Bản',
    description: 'Hand-drawn feel, vibrant, Makoto Shinkai style',
    description_vi: 'Nét vẽ tay 2D, màu sắc rực rỡ, phong cách Makoto Shinkai',
    prompt_modifier: 'Anime style, Makoto Shinkai art style, vibrant colors, detailed background art, high quality 2D animation',
    image: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=600&q=80'
  },
  { 
    id: 'cyberpunk', 
    name: 'Cyberpunk', 
    name_vi: 'Cyberpunk Viễn tưởng',
    description: 'Neon lights, dark atmosphere, high tech, sci-fi',
    description_vi: 'Đèn neon, không khí tối tăm, công nghệ cao, Sci-fi',
    prompt_modifier: 'Cyberpunk style, neon lighting, futuristic city, rain-slicked streets, high tech, dark atmosphere, blade runner vibe',
    image: 'https://images.unsplash.com/photo-1515630278258-407f66498911?auto=format&fit=crop&w=600&q=80'
  },
  { 
    id: 'vintage', 
    name: 'Vintage Film (16mm)', 
    name_vi: 'Phim nhựa cổ điển',
    description: 'Film grain, retro colors, nostalgic feel',
    description_vi: 'Hạt nhiễu film, màu hoài cổ, cảm giác cũ kỹ những năm 90',
    prompt_modifier: 'Vintage 16mm film look, film grain, retro color palette, nostalgic atmosphere, light leaks, old movie style',
    image: 'https://images.unsplash.com/photo-1505682634904-d7c8d95cdc50?auto=format&fit=crop&w=600&q=80'
  },
  { 
    id: 'claymation', 
    name: 'Claymation', 
    name_vi: 'Hoạt hình đất sét',
    description: 'Textured, handmade feel, Aardman style',
    description_vi: 'Chất liệu đất sét, thủ công, phong cách Aardman',
    prompt_modifier: 'Claymation style, stop motion animation, plasticine texture, handmade look, studio lighting',
    image: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&w=600&q=80'
  },
  { 
    id: 'noir', 
    name: 'Film Noir', 
    name_vi: 'Phim Noir Đen Trắng',
    description: 'Black & white, high contrast, mysterious',
    description_vi: 'Đen trắng, tương phản cao, bí ẩn, kịch tính',
    prompt_modifier: 'Film noir style, black and white, high contrast, dramatic shadows, silhouetted figures, moody atmosphere, 1940s detective style',
    image: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=600&q=80'
  },
];

// --- IMAGE STYLES (MATCHING CAPCUT UI) ---
export const IMAGE_STYLES = [
  // 0. CUSTOM STYLE (New Input Feature)
  {
    id: 'custom-style',
    name: 'Custom Style',
    name_vi: 'Tùy chỉnh Style',
    description: 'Enter your own visual style description...',
    description_vi: 'Nhập mô tả phong cách hình ảnh của riêng bạn...',
    prompt_modifier: '', // Will be overridden by user input
    image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=600&q=80'
  },
  // 1. Realistic Film (Classic Portrait)
  { 
    id: 'cap-realistic-film', 
    name: 'Realistic Film', 
    name_vi: 'Phim Thực tế',
    description: 'Cinematic, 35mm film grain, atmospheric, high fidelity',
    description_vi: 'Điện ảnh, hạt film 35mm, khí chất, độ chân thực cao',
    prompt_modifier: 'Realistic film still, cinematic lighting, 35mm film grain, hyper-realistic, highly detailed, atmospheric, shot on Kodak Portra, 8k, professional portrait',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80' 
  },
  // 2. Cartoon 3D (3D Character)
  { 
    id: 'cap-cartoon-3d', 
    name: 'Cartoon 3D', 
    name_vi: 'Hoạt hình 3D',
    description: 'Cute, rounded shapes, Pixar style, soft lighting',
    description_vi: 'Dễ thương, bo tròn, phong cách Pixar, ánh sáng mềm',
    prompt_modifier: '3D cartoon style, Pixar animation style, soft studio lighting, cute character design, vibrant colors, 3D render, C4D, Redshift, expressive eyes, adorable',
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=600&q=80'
  },
  // 3. Urban Dream (City Nights / Anime Vibe - UPDATED LINK)
  { 
    id: 'cap-urban-dream', 
    name: 'Urban Dream', 
    name_vi: 'Giấc Mơ Đô Thị',
    description: 'Soft anime, pastel city lights, lo-fi vibe, romantic',
    description_vi: 'Anime mềm mại, ánh đèn thành phố pastel, lãng mạn',
    prompt_modifier: 'Urban dream style, soft anime aesthetic, pastel city lights, lo-fi vibe, dreamy atmosphere, Makoto Shinkai inspired, romantic, soft focus, glowing, anime girl portrait',
    image: 'https://images.unsplash.com/photo-1536566482680-fca31930a0bd?auto=format&fit=crop&w=600&q=80'
  },
  // 4. Photograph (Wildlife - UPDATED LINK)
  { 
    id: 'cap-photograph', 
    name: 'Photograph', 
    name_vi: 'Nhiếp ảnh Tự nhiên',
    description: 'Sharp focus, wildlife or portrait, natgeo style',
    description_vi: 'Sắc nét, phong cách NatGeo, chi tiết chân thực',
    prompt_modifier: 'National Geographic photography style, wildlife photography, sharp focus, 8k, hyper-realistic, natural lighting, telephoto lens, detailed texture',
    image: 'https://images.unsplash.com/photo-1561731216-c3a4d99437d5?auto=format&fit=crop&w=600&q=80'
  },
  // 5. Whimsical (Soft Clouds / Pastel)
  { 
    id: 'cap-whimsical', 
    name: 'Whimsical', 
    name_vi: 'Kỳ ảo Mộng mơ',
    description: 'Fairy tale, soft pastel, ethereal, storybook illustration',
    description_vi: 'Cổ tích, màu pastel, thanh thoát, minh họa truyện',
    prompt_modifier: 'Whimsical art style, soft pastel colors, dreamy atmosphere, fairy tale illustration, delicate details, ethereal lighting, magical, storybook style, watercolor finish',
    image: 'https://images.unsplash.com/photo-1516641396056-0ce60a85d49f?auto=format&fit=crop&w=600&q=80'
  },
  // 6. Felt Dolls (Wool/Textured)
  { 
    id: 'cap-felt-dolls', 
    name: 'Felt Dolls', 
    name_vi: 'Búp bê Len Nỉ',
    description: 'Wool texture, needle felting, handmade, fuzzy, macro',
    description_vi: 'Chất liệu len nỉ, thủ công, xù bông, chụp cận cảnh',
    prompt_modifier: 'Felt doll style, needle felting texture, wool material, handmade craft look, macro photography, soft focus, cute and fuzzy, fabric details, stop motion vibe',
    image: 'https://images.unsplash.com/photo-1550948537-130a1ce83314?auto=format&fit=crop&w=600&q=80'
  },
  // 7. Crayon (Drawing)
  { 
    id: 'cap-crayon', 
    name: 'Crayon Art', 
    name_vi: 'Tranh Sáp màu',
    description: 'Wax texture, child drawing, colorful, rough paper',
    description_vi: 'Chất liệu sáp, nét vẽ trẻ thơ, đầy màu sắc, giấy nhám',
    prompt_modifier: 'Crayon drawing style, wax texture, child\'s drawing aesthetic, colorful, rough paper texture, naive art, playful, hand drawn, cute dinosaur',
    image: 'https://images.unsplash.com/photo-1596495577886-d920f1fb7238?auto=format&fit=crop&w=600&q=80'
  },
  // 8. Tiny World (Miniature figures)
  { 
    id: 'cap-tiny-world', 
    name: 'Tiny World', 
    name_vi: 'Thế giới Tí hon',
    description: 'Tilt-shift, miniature diorama, macro lens, giant world',
    description_vi: 'Hiệu ứng Tilt-shift, mô hình thu nhỏ, ống kính macro',
    prompt_modifier: 'Tiny world effect, tilt-shift photography, miniature diorama, macro lens, shallow depth of field, giant world perspective, miniature figures, playful scale',
    image: 'https://images.unsplash.com/photo-1460500063983-994d4c27756c?auto=format&fit=crop&w=600&q=80'
  },
  // 9. Dreamscape (Surreal)
  { 
    id: 'cap-dreamscape', 
    name: 'Dreamscape', 
    name_vi: 'Cõi Mộng',
    description: 'Surreal, magical objects, floating, golden light',
    description_vi: 'Siêu thực, vật thể ma thuật, bay bổng, ánh sáng vàng',
    prompt_modifier: 'Dreamscape art, surreal fantasy, magical objects, golden lighting, bokeh, ethereal, vibrant colors, imagination, christmas vibe',
    image: 'https://images.unsplash.com/photo-1536697246787-1f7ae568d89a?auto=format&fit=crop&w=600&q=80'
  },
  // 10. Dynamic (Motion - UPDATED LINK)
  { 
    id: 'cap-dynamic', 
    name: 'Dynamic Action', 
    name_vi: 'Hành động Kịch tính',
    description: 'Motion blur, intense angles, speed lines, high energy',
    description_vi: 'Mờ chuyển động, góc máy gắt, đường tốc độ, năng lượng cao',
    prompt_modifier: 'Dynamic action shot, motion blur, intense perspective, fisheye lens, dramatic lighting, high energy, speed lines, cinematic composition, falling through sky',
    image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?auto=format&fit=crop&w=600&q=80'
  },
  // 11. Sketch Color (New)
  {
    id: 'cap-sketch-color',
    name: 'Sketch Color',
    name_vi: 'Phác thảo Màu',
    description: 'Hand-drawn, rough outlines, watercolor/marker, sketchbook texture',
    description_vi: 'Vẽ tay, nét phác thảo thô, màu nước/marker, giấy vẽ',
    prompt_modifier: 'Sketch color style, hand-drawn artwork, rough expressive outlines, graphite pencil or ink pen, loose and varied lines, watercolor washes, alcohol markers, white space, bleeding edges, sketchbook paper texture, artistic, vibrant, raw energy, draft aesthetic',
    image: 'https://images.unsplash.com/photo-1579762715118-a6f1d4b934f1?auto=format&fit=crop&w=600&q=80'
  }
];

// --- VIDEO MODE INSTRUCTION (Strict 8s) ---
export const getVideoSystemInstruction = (styleModifier: string, language: 'en' | 'vi') => {
  const isVietnamese = language === 'vi';
  return `
Bạn là một Chuyên gia Đạo diễn Video AI (AI Video Director). Nhiệm vụ: nghe audio, chia đoạn và tạo prompt video (Kling, Runway, Luma).

Operational Rules (Video Mode):
1. Segmentation (Chia đoạn): Chia toàn bộ audio thành các đoạn CỐ ĐỊNH theo thời gian, mỗi đoạn dài ĐÚNG 8 GIÂY (00:00-00:08, 00:08-00:16...). 
2. Prompt Matching:
   - Mỗi đoạn 8 giây = 1 Scene.
   - Scene 1 -> Prompt #1, Scene 2 -> Prompt #2.
   - Tuyệt đối không lệch số thứ tự.
3. Consistency Lock (Quan trọng):
   - Style: "${styleModifier}"
   - Tạo một "Master Description" chi tiết về nhân vật/bối cảnh.
   - BẮT BUỘC: Mọi prompt phải bắt đầu bằng "Master Description" để video không bị nhảy nhân vật.
4. Structure: [Master Description] + [Hành động trong 8s] + [Góc máy] --ar 16:9

Output Format (Markdown):
${isVietnamese ? 'Phân tích Tiếng Việt, Prompt Tiếng Anh.' : 'English only.'}

# ${isVietnamese ? 'PHÂN TÍCH VIDEO (8s/SHOT)' : 'VIDEO ANALYSIS (8s/SHOT)'}
**Style:** ${styleModifier}
**Master Description:** [Mô tả gốc]

# ${isVietnamese ? 'KỊCH BẢN CHI TIẾT' : 'DETAILED SCRIPT'}
## 🎬 Scene 1: [00:00 - 00:08]
- **Prompt #1:** [Master Description] + [Action] + [Camera] --ar 16:9

## 🎬 Scene 2: [00:08 - 00:16]
- **Prompt #2:** [Master Description] + [Action] + [Camera] --ar 16:9
...
`;
};

// --- IMAGE MODE INSTRUCTION (Scene Based) ---
export const getImageSystemInstruction = (styleModifier: string, language: 'en' | 'vi') => {
  const isVietnamese = language === 'vi';
  return `
Bạn là một Chuyên gia Minh họa AI (AI Illustrator) chuyên tạo prompt cho Google ImageFX (Imagen 3).

Operational Rules (Image Mode):
1. Segmentation (Chia đoạn):
   - KHÔNG chia theo giây cố định.
   - Hãy chia audio thành các "Phân cảnh" (Scenes) dựa trên sự thay đổi về nội dung, bối cảnh hoặc cảm xúc câu chuyện.

2. One-to-One Mapping (Rất quan trọng):
   - **Mỗi Phân cảnh (Scene) CHỈ ĐƯỢC có đúng 1 Prompt duy nhất.**
   - Tuyệt đối KHÔNG tạo nhiều lựa chọn (Option 1, Option 2).
   - Số thứ tự Prompt phải trùng với số thứ tự Scene (Scene 1 -> Prompt #1, Scene 2 -> Prompt #2).

3. Consistency Lock (Tính nhất quán tuyệt đối):
   - **Visual Style:** "${styleModifier}"
   - **Character & World:** Trước khi viết prompt chi tiết, hãy định nghĩa "Character Description" (Ngoại hình, trang phục, đặc điểm) và "Setting Description" (Không gian chung).
   - **Quy tắc:** Mọi prompt tạo ảnh PHẢI chứa các mô tả về nhân vật và bối cảnh giống hệt nhau, chỉ thay đổi hành động và biểu cảm.

4. Prompt Structure (Tối ưu cho Imagen 3):
   Format: "- **Prompt #X:** [Content]"
   Content: [Visual Style Keywords], [Character Description], [Action/Pose specific to this scene], [Detailed Background/Lighting], [Composition/Angle], high quality, highly detailed --ar 16:9

Output Format (Markdown):
${isVietnamese ? 'Phân tích Tiếng Việt, Prompt Tiếng Anh.' : 'English only.'}

# ${isVietnamese ? 'PHÂN TÍCH MINH HỌA (THEO BỐI CẢNH)' : 'ILLUSTRATION ANALYSIS (SCENE BASED)'}
**Style:** ${styleModifier}
**Consistent Character:** [Mô tả nhân vật cố định]
**Consistent Setting:** [Mô tả bối cảnh cố định]

# ${isVietnamese ? 'DANH SÁCH PROMPT TẠO ẢNH' : 'IMAGE PROMPT LIST'}

## 🖼️ Scene 1: [Tóm tắt nội dung/bối cảnh]
**${isVietnamese ? 'Thời gian' : 'Time'}:** [Ví dụ: 00:00 - 00:15]
- **Prompt #1:** [Style] + [Character] + [Specific Action] + [Setting] + [Details] --ar 16:9

## 🖼️ Scene 2: [Tóm tắt nội dung/bối cảnh]
**${isVietnamese ? 'Thời gian' : 'Time'}:** ...
- **Prompt #2:** [Style] + [Character] + [Specific Action] + [Setting] + [Details] --ar 16:9

...
`;
};
